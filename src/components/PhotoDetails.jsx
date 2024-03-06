import { useState } from "react";
import "../styles/photoDetails.css";
import { EditPhoto } from "./EditPhoto";

export const PhotoDetails = (props) => {
  const auth = sessionStorage.getItem("accessToken") || null;
  const handleEditPhoto = () => {
    props.setEditPhoto(true);
  };
  return (
    <div>
      {props.photoDetailsLoading ? (
        <div className="single-photodetails">
          <img src={props.photoDetails.urls.small} />
          {props.editPhoto ? (
            
              <EditPhoto
                setEditPhotoStatus={props.setEditPhoto}
                photoDetailsData={props.photoDetails}
                photoID={props.photoID}
              />
            
          ) : (
            <>
              <div className="photodetails-description">
                <div className="photodetails-text">
                  <div>
                    <div>
                      <span className="photodetails-text-title">
                        Photo Name:
                      </span>
                      <span className="photodetails-text-field">
                        {props.photoDetails.description}
                      </span>
                    </div>
                    <div>
                      <span className="photodetails-text-title">City:</span>
                      <span className="photodetails-text-field">
                        {props.photoDetails.location.city}
                      </span>
                    </div>
                    <div>
                      
                      <span className="photodetails-text-title">Country:</span>
                      <span className="photodetails-text-field">
                        {props.photoDetails.location.country}
                      </span>
                    </div>
                  </div>
                  {auth !=null && <button onClick={handleEditPhoto}>Edit</button>}
                  
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <p>Nothing...</p>
      )}
    </div>
  );
};
