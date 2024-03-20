import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiCallCollection } from "../components/ApiCallCollection";
import { PhotoSelected } from "../components/PhotoSelected";
import { Header } from "../components/Header";
import "../styles/collectionsPage.css";

export const CollectionsPage = () => {
  const { id } = useParams();
  const [collectionPhotos, setCollectionPhotos] = useState("");
  const [collectionPhotosLoad, setCollectionPhotosLoad] = useState(false);
  const [collection, setCollection] = useState("");
  const [collectionLoad, setCollectionLoad] = useState(false);



  const getCollectionPhoto = async () => {
    setCollectionPhotosLoad(false)
    const response = await ApiCallCollection.getCollectionPhotos(id);
    if (response.ok) {
      const responsedata = await response.json();
      setCollectionPhotos(responsedata);
      setCollectionPhotosLoad(true);
      getCollection()
      console.log("getCollections", collectionPhotos);
    }
    
  };
  const getCollection =async () =>{
    setCollectionLoad(false)
    const response = await ApiCallCollection.getCollection(id);
    if (response.ok) {
      const responsedata = await response.json();
      setCollection(responsedata)
      setCollectionLoad(true)
      console.log("responsedata", responsedata);
    }
  }
  useEffect(() => {
    getCollectionPhoto();
  }, []);

  return (
    <div className="collection-photo-comp">
      <Header />
      <div className="collection-photos">
        {collectionPhotosLoad && collectionLoad ?
          (collectionPhotos.length > 0 ? (
            <PhotoSelected
              userSelectedInfo={collectionPhotos}
              id={id}
              getCollectionPhoto={getCollectionPhoto}
              collectionUserID={collection.user.id}
            />
          ) : (
            <p>No Photos in the Collection</p>
          )):""}
      </div>
    </div>
  );
};
