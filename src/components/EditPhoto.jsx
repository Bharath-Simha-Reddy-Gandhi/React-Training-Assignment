import { useState } from "react";
import { ApiCallPhotos } from "../components/ApiCallPhotos";
import "../styles/editPhoto.css";

export const EditPhoto = (props) => {
  const [editedPhotoDetails, setEditedPhotoDetails] = useState({
    id: props.photoID,
    description: props.photoDetailsData.description,
 
      city: props.photoDetailsData.location.city,
      country: props.photoDetailsData.location.country,
    
  });
  const editedDetails = {
    id: props.photoID,
    description: editedPhotoDetails.description,
    location: {
      city: editedPhotoDetails.city,
      country: editedPhotoDetails.country,
    },
  }

  const editedPhotoData = JSON.stringify(editedDetails);
  const handleChange = (e) => {
    setEditedPhotoDetails({
      ...editedPhotoDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitEditPhoto = async (photoID, editedPhotoData) => {
    const response = await ApiCallPhotos.updatePhotoDetails(
      photoID,
      editedPhotoData
    );
    if (response.ok) {
      alert("Updated Sucessfully");
      props.setEditPhotoStatus(false);
    }
  };
  const cancelEditPhoto = () => {
    props.setEditPhotoStatus(false);
  };
  return (
    <>
      <form
        action="submit"
        className="editphotoform"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="photoname">Photo Name</label>
          <textarea
            rows={4}
            type="text"
            value={editedPhotoDetails.description}
            id="photoname"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={editedPhotoDetails.city}
            id="city"
            name="city"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            value={editedPhotoDetails.country}
            id="country"
            name="country"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() => handleSubmitEditPhoto(props.photoID, editedPhotoData)}
        >
          Submit
        </button>
        <button className="cancel-button" onClick={cancelEditPhoto}>Cancle</button>
      </form>
    </>
  );
};
