import React, {useState, useEffect} from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchVideos, openUploadWidgetVideo } from "./CloudinaryServiceVideo";
import './Cloudinary.css';
import { Button } from "reactstrap";

function CloudinaryVideo(props) {
  const [videos, setVideos] = useState([]);

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "emrcloud",
      tags: [tag],
      uploadPreset: "upload"
    };
  
    openUploadWidgetVideo(uploadOptions, (error, photos) => {
      if (!error) {
        if(photos.event === 'success'){
          const videoURL = `https://res.cloudinary.com/emrcloud/video/upload/f_auto,q_auto/v1/${photos.info.public_id}.mov`
          props.handleVideo(videoURL)
          setVideos([...videos, photos.info.public_id])
          // console.log("PHOTOS", photos);
          // console.log("IMAGES", images)
        }
      } else {
        console.log(error);
      }
    })
  };

  useEffect( () => {
    fetchVideos("video", setVideos);
  }, []);

  return (
    <CloudinaryContext cloudName="emrcloud">
      <div className="formgrid">
      <label></label>
      <Button color="primary" onClick={() => beginUpload("nonsense")}>Upload Video</Button> 
        <section>
          {videos.map(i => <video
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

export default CloudinaryVideo