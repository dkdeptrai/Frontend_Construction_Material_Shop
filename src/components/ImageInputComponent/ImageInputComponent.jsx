import React, { useState } from "react";
import UploadImageIcon from "../../assets/icons/uploadImage.svg?react";
import "./ImageInputComponent.css";

const ImageInputComponent = ({ onClick, setImage }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [imageChosen, setImageChosen] = useState(false);

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg, image/png"; // only accept JPEG and PNG files
    input.onchange = (e) => {
      // handle the selected image file
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.onload = () => {
        // create an image element
        const img = new Image();
        img.onload = () => {
          // dynamically create a canvas element
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // calculate the new dimensions
          const MAX_WIDTH = 250;
          const MAX_HEIGHT = 250;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          // resize the image
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // set the background image of the component
          setBackgroundImage(`url(${canvas.toDataURL(file.type)})`);
          // set imageChosen to true after an image has been chosen
          setImageChosen(true);
          // set the image state in the parent component
          setImage(fileReader.result);
        };
        img.src = fileReader.result; // set the image source here
      };
      fileReader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div
      className="imageContainer"
      style={{
        backgroundImage,
        backgroundSize: "cover", // Add this line
        backgroundPosition: "center", // Add this line
        backgroundRepeat: "no-repeat", // Add this line
      }}
      onClick={handleImageClick}
    >
      {!imageChosen && <UploadImageIcon />}
    </div>
  );
};

export default ImageInputComponent;
