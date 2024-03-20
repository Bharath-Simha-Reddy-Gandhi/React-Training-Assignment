import { Link } from "react-router-dom";

export const UserLikedPhotos = (props) => {
  return (
    <>
      {props.userSelectedInfo.map((item) => {
        return (
          <div className="user-photos" key={item.id}>
            <Link to={`/photos/${item.id}`}>
            <img src={item.urls.regular} alt={item.alt_description} />
            </Link>
            {sessionStorage.getItem("userID") === props.userID && (
              <button
                onClick={() => props.handleLikes(item.id, item.liked_by_user)}
              >
                Dislike
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};
