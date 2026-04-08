const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const { randomUUID } = require("crypto");
const app = express();
const DB = require("./database");
const { peerProxy, broadcastGameEvent } = require("./peerProxy");

const authCookieName = "token";

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//check if the user is authorized
apiRouter.get("/auth/me", async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);

  if (user) {
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// CreateAuth a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    await DB.addUser(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = randomUUID();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// GetProgress
apiRouter.get("/progress", verifyAuth, async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  const position = await DB.getPlayerPosition(user.email);
  res.send(position);
});

apiRouter.get("/progress/all", verifyAuth, async (_req, res) => {
  const users = await DB.getAllPlayerPositions();
  res.send(users);
});

// SubmitProgress
apiRouter.post("/progress", verifyAuth, async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  await DB.updatePlayerPosition(user.email, req.body.playerPosition);
  const position = await DB.getPlayerPosition(user.email);

  broadcastGameEvent({
    type: "move",
    user: user.email,
    playerPosition: position.playerPosition,
    message: `${user.email} moved to square ${position.playerPosition}`,
  });

  if (position.playerPosition >= 134) {
    broadcastGameEvent({
      type: "win",
      user: user.email,
      playerPosition: position.playerPosition,
      message: `${user.email} won the game!`,
    });
  }

  res.send(position);
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  return {
    email: email,
    password: passwordHash,
    token: randomUUID(),
    playerPosition: null,
  };
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
  });
}

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
