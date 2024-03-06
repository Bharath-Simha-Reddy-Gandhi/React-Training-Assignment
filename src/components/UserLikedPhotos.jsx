

export const UserLikedPhotos = (props) =>{
    return(
        <>
        {
            props.userSelectedInfo.map((item) => {
                return (
                  <div className="user-photos" key={item.id}>
                    <img
                      src={item.urls.regular}
                      alt={item.alt_description}
                    />
                    <button
                      onClick={() =>
                        props.handleLikes(item.id, item.liked_by_user)
                      }
                    >
                      Dislike
                    </button>
                  </div>
                );
              })
        }
        </>
    )
}