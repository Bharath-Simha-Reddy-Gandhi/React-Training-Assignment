import { Link } from "react-router-dom";

export const PhotoSelected = (props) =>{
    return(
        <>
        {props.userSelectedInfo.map((item) => {
                    return (
                      <div className="user-photos" key={item.id}>
                        <Link to={`/photos/${item.id}`} key={item.id}>
                          <img
                            src={item.urls.regular}
                            alt={item.alt_description}
                          />
                        </Link>
                        <p>{item.description}</p>
                        <p>{item.location}</p>
                      </div>
                    );
                  })}
        </>
    )
}