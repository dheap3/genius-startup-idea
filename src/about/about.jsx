import React from "react";
import "./about.css";

export function About() {
  const [image, setImage] = React.useState({});
  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched image data:", data);
        console.log("Image URL:", data[0].url);
        const containerEl = document.querySelector("#CANDY");

        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;
        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;

        setImage(data[0]);
      })
      .catch();
  }, []);

  function getRandomCandy() {
    // curl https://picsum.photos/v2/list
    //get candy
    let candy = { name: `image by ${image.author}`, image: { url: image.url } };
    //parse candy
    console.log(candy.image.url);
    return candy.image.url;
  }
  return (
    <main>
      <h1 id="title">About Candy Land</h1>
      <div id="CANDY">
        <h4>Image of the day:</h4>
        <img src={`https://picsum.photos/id/${image.id}/300/200`} alt="Random candy image" />
      </div>
      <div id="instructions">
        <img src="images/Candy-Land-Story.png" alt="Candy Land Story" />
        <img src="images/Instructions1.png" alt="Candy Land Instructions part 1" />
        <img src="images/Instructions2.png" alt="Candy Land Instructions part 2" />
      </div>
    </main>
  );
}
