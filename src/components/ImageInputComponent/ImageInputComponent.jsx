import React, { useState } from "react";
import UploadImageIcon from "../../assets/icons/uploadImage.svg?react";
import "./ImageInputComponent.css";
import Resizer from "react-image-file-resizer";

const ImageInputComponent = ({ setImage }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [imageChosen, setImageChosen] = useState(false);

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg, image/png"; // only accept JPEG and PNG files
    input.onchange = (e) => {
      // handle the selected image file
      const file = e.target.files[0];

      // Resize the image
      Resizer.imageFileResizer(
        file,
        250,
        250,
        file.type === "image/png" ? "PNG" : "JPEG",
        100,
        0,
        (uri) => {
          // Convert the data URI to a Blob
          const byteString = atob(uri.split(",")[1]);
          const mimeString = uri.split(",")[0].split(":")[1].split(";")[0];
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ia], { type: mimeString });

          // set the image state in the parent component
          setImage(blob);

          // set the background image of the component
          setBackgroundImage(`url(${uri})`);

          // set imageChosen to true after an image has been chosen
          setImageChosen(true);
        },
        "base64"
      );
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
