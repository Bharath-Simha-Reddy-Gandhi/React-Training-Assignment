import { Constants } from "./Constants";
const auth = sessionStorage.getItem("accessToken");

export const ApiCallPhotos = {
    getPhotoList : async(page) => {
        let headerAuth = (auth !== null? `Bearer ${sessionStorage.getItem("accessToken")}`: `Client-ID ${process.env.REACT_APP_CLIENT_ID}`)
        return( await fetch(
            `${process.env.REACT_APP_API_URL}/photos?page=${page}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: headerAuth,
              },
            }
          )
        )
      },
      likeUnlikePhotos : async (photoId,photoLikeStatus) =>{
        const method = photoLikeStatus ? "DELETE" : "POST";
          return( await fetch(
            `${process.env.REACT_APP_API_URL}/photos/${photoId}/like`,
            {
              method,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
              },
            }
          )
          )
      },
      handleEditProfile : async(userDetails) =>{
        return(
          await fetch(`${process.env.REACT_APP_API_URL}/me`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(userDetails),
          })
        )
      },
      updatePhotoDetails: async (id, data) => {
        return await fetch(`${process.env.REACT_APP_API_URL}/photos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: data,
        });
      }
}