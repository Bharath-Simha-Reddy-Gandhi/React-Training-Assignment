import { useCallback, useEffect, useState } from "react";
import { Constants } from "./Constants";
import { Link } from "react-router-dom";
// import { getPhotoList, likeUnlikePhotos, } from "./ApiCalls";
import { ApiCallPhotos } from "./ApiCallPhotos";
import "../styles/randomImages.css";
import { Pagination } from "@mui/material";

export const RandomImages = () => {
  const [randomImages, setRandomImages] = useState();
  const [randomImagesLoading, setRandomImagesLoading] = useState(false);
  const auth = sessionStorage.getItem("accessToken");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getRandomImages = async (page) => {
    try {
      const response = await ApiCallPhotos.getPhotoList(page);

      if (response.status === 200) {
        const movies = await response.json();
        setRandomImages(movies);
        setRandomImagesLoading(true);
        const calTotalPages = Math.ceil(
          response.headers.get("X-Total") / Constants.per_page
        );
        setTotalPages(calTotalPages);
      }
    } catch (error) {
      <h2>Try Again</h2>;
    }
  };

  useEffect(() => {
    setRandomImagesLoading(false);
    getRandomImages(page);
  }, [auth, page]);

  const handleLikes = async (photoId, photoLikeStatus) => {
    try {
      const response = await ApiCallPhotos.likeUnlikePhotos(
        photoId,
        photoLikeStatus
      );
      if (response.ok) {
        const responseData = await response.json();
        alert(photoLikeStatus ? "Unliked the image" : "Liked the image");
        getRandomImages(page);
      }
    } catch (error) {
      alert("Error:", error.message);
    }
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div >
        <div className="ran-img-containers">
          {randomImagesLoading ? (
            randomImages.map((photo) => {
              return (
                <div className="ran-img-container" key={photo.id}>
                  <img src={photo.urls.small} alt={photo.urls.description} />
                  {auth !== null && (
                    <div className="like-dislike-buttons">
                      {photo.liked_by_user ? (
                        <button
                          onClick={() =>
                            handleLikes(photo.id, photo.liked_by_user)
                          }
                        >
                          Dislike
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleLikes(photo.id, photo.liked_by_user)
                          }
                        >
                          Like
                        </button>
                      )}
                    </div>
                  )}
                  <div>
                    <p>Likes: {photo.likes}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous Page
          </button>
          {randomImagesLoading && <p>{page}</p>}

          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next Page
          </button>
        </div>
      </div>

      {/* <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        size="large"
        className="pagination"
      /> */}
    </>
  );
};
