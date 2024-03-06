import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Constants } from "../components/Constants";
import { PhotoDetails } from "../components/PhotoDetails";
import { Header } from "../components/Header";
import { ApiCalls } from "../components/ApiCalls";

export const PhotoDetailsPage = () => {
  const [editPhoto, setEditPhoto] = useState(false);
  const { id } = useParams();
  const [photoDetails, setPhotoDetails] = useState();
  const [photoDetailsLoading, setPhotoDetailsLoading] = useState(false);
  const auth = sessionStorage.getItem("accessToken");

  const handlePhotoDetails = async (auth, id) => {
    const response = await ApiCalls.getPhotoDetails(auth, id);
    if (response.ok) {
      const responseData = await response.json();
      setPhotoDetails(responseData);
      setPhotoDetailsLoading(true);
      console.log(photoDetails);
    }
  };
  useEffect(() => {
    handlePhotoDetails(auth, id);
  }, [editPhoto]);

  return (
    <>
      <Header />
      <PhotoDetails
        editPhoto={editPhoto}
        setEditPhoto={setEditPhoto}
        photoID={id}
        photoDetails={photoDetails}
        photoDetailsLoading={photoDetailsLoading}
      />
    </>
  );
};
