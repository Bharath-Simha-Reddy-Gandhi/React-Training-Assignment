

export const SelectedCollections = (props) =>{

    return(
        <>
        {
             props.userSelectedInfo.map((item) => {
                return (
                  <div className="user-photos" key={item.id}>
                    <img src={item.cover_photo.urls.small} alt={item.cover_photo.alt_description} />
                    <p>Title: {item.title}</p>
                  </div>
                );
              })
        }
        </>
    )
}