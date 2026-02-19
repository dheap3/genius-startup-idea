import React from "react";
import "./about.css";

export function About() {
  return (
    <main>
      <h1 id="title">About Candy Land</h1>
      <div id="CANDY">
        <h4>Candy of the day:</h4>
        <span>API for random candy here</span>
      </div>
      <div id="instructions">
        <img src="images/Candy-Land-Story.png" alt="Candy Land Story" />
        <img src="images/Instructions1.png" alt="Candy Land Instructions part 1" />
        <img src="images/Instructions2.png" alt="Candy Land Instructions part 2" />
      </div>
    </main>
  );
}
