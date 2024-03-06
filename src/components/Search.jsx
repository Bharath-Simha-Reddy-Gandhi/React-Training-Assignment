import '../styles/search.css'
import {ApiCallPhotos} from './ApiCallPhotos'


export const Search = (props) => {
  const auth = sessionStorage.getItem('accessToken')
  const handleLikes = async (photoId, photoLikeStatus) => {
    try {
      const response = await ApiCallPhotos.likeUnlikePhotos(
        photoId,
        photoLikeStatus
      );
      if (response.ok) {
        const responseData = await response.json();
        alert(photoLikeStatus ? "Unliked the image" : "Liked the image");
        props.handleSearch(props.userSelectedInput, props.query, props.page);
      }
    } catch (error) {
      alert("Error:", error.message);
    }
  };
  return (
    <div className="search-comp">
    {props.searchQueryDataLoading === true ? 
      
        props.userSelectedInput === "photos" ?
        props.searchQueryData.map((item) => {
          return (
            <div>
              <img src={item.urls.small} alt="" />
              <p>{item.alt_description}</p>
              {auth !== null && (
                    <div className="like-dislike-buttons">
                      {item.liked_by_user ? (
                        <button
                          onClick={() =>
                            handleLikes(item.id, item.liked_by_user)
                          }
                        >
                          Dislike
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleLikes(item.id, item.liked_by_user)
                          }
                        >
                          Like
                        </button>
                      )}
                    </div>
                  )}
                  <p>Likes: {item.likes}</p>
            </div>
          );
        }): props.userSelectedInput === "collections" ?
        props.searchQueryData.map((item) => {
          return (
            <div>
                <img src={item.cover_photo.urls.small} alt="" />
              <p >{item.id}</p>
            </div>
          );
        }): 
        props.searchQueryData.map((item) => {
          return (
            <div>
                <img src={item.profile_image.large} alt="" />
              <p > {item.first_name}</p>
            </div>
          );
        }):(<p>Loading....</p>)
    }
     
    </div>
  );
};
