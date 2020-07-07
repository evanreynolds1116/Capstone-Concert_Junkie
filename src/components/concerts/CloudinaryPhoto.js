import React, {useState, useEffect} from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./CloudinaryService";
import './Cloudinary.css';
import { Button } from "reactstrap";

function CloudinaryPhoto(props) {
  const [images, setImages] = useState([]);

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "emrcloud",
      tags: [tag],
      uploadPreset: "upload"
    };
  
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        if(photos.event === 'success'){
          const photoURL = `https://res.cloudinary.com/emrcloud/image/upload/f_auto,q_auto/v1/${photos.info.public_id}`
          props.handlePhoto(photoURL)
          setImages([...images, photos.info.public_id])
          // console.log("PHOTOS", photos);
          console.log("IMAGES", images)
        }
      } else {
        console.log(error);
      }
    })
  };

  // useEffect( () => {
  //   fetchPhotos("image", setImages);
  // }, []);

  return (
    <CloudinaryContext cloudName="emrcloud">
      <div className="formgrid">
      <label></label>
      <Button color="primary" onClick={() => beginUpload("nonsense")}>+ Upload Photo</Button> 
        <section>
          {images.map(i => <Image
            key={i}
            publicId={i}
            fetch-format="auto"
            quality="auto"
          />)}
        </section>
      </div>
    </CloudinaryContext>
  );
}

export default CloudinaryPhoto