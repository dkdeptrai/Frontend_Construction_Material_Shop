import React, { useState, useRef, useEffect } from "react";
import UploadImageIcon from "../../assets/icons/uploadImage.svg?react";
import Resizer from "react-image-file-resizer";
import "./ImageInputComponent.css";

const ImageInputComponent = ({ setImage, imageUrl }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [imageChosen, setImageChosen] = useState(false);
  const fileInputRef = useRef();

  // This useEffect will update the component state when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      setBackgroundImage(`url(${imageUrl})`);
      setImageChosen(true);
    } else {
      setBackgroundImage("");
      setImageChosen(false);
    }
  }, [imageUrl]);

  const handleImageChange = (file) => {
    // Resize the image and update the states accordingly
    Resizer.imageFileResizer(
      file,
      250,
      250,
      file.type === "image/png" ? "PNG" : "JPEG",
      100,
      0,
      (uri) => {
        // Convert the data URI to a Blob if you need to upload it as a file
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

  const handleImageClick = () => {
    // Trigger file input click
    fileInputRef.current.click();
  };

  // This function will be called when the file input changes
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  return (
    <div
      className="imageContainer"
      style={{
        backgroundImage: imageChosen ? backgroundImage : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleImageClick}
    >
      {!imageChosen && <UploadImageIcon />}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png"
        style={{ display: "none" }}
        onChange={handleFileInputChange} // Attach onChange handler
      />
    </div>
  );
};

export default ImageInputComponent;
