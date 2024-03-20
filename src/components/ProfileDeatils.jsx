import { useCallback, useEffect, useState } from "react";
import "../styles/profileDetails.css";
import { EditProfile } from "./EditProfile";
import { Constants } from "./Constants";
import { ApiCalls } from "./ApiCalls";
import { ApiCallPhotos } from "../components/ApiCallPhotos";
import { Link } from "react-router-dom";
import { PhotoSelected } from "./PhotoSelected";
import { UserLikedPhotos } from "./UserLikedPhotos";
import { SelectedCollections } from "./SelectedCollections";
import { SelectedStats } from "./SelectedStats";

export const ProfileDeatils = (props) => {
  console.log(props.username);
  const [userData, setUserData] = useState("");
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [userSelected, setUserSelected] = useState("photos");
  const [userSelectedInfo, setUserSelectedInfo] = useState()
  const [userSelectedInfoLoading, setUserSelectedInfoLoading] = useState(false);
  const [editState, setEditState] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log(!props.username);

  const getProfileDetails = async () => {
    const userProfileResponse = await ApiCalls.getProfileDetail();
    if (userProfileResponse.ok) {
      const userProfile = await userProfileResponse.json();
      setUserData(userProfile);
      setUserDataLoading(true);
      userSelectedInformation(userProfile.username, userSelected, page);
    }
  };
  const getPublicUserProfile = async () => {
    const userProfileResponse = await ApiCalls.getPublicUserProfile(
      props.username
    );
    if (userProfileResponse.ok) {
      const userProfile = await userProfileResponse.json();
      setUserData(userProfile);
      setUserDataLoading(true);
      userSelectedInformation(props.username, userSelected, page);
    }
  };

  const userSelectedInformation = useCallback(
    async (userData, userSelected, page) => {
      setUserSelectedInfoLoading(false);
      const userSelectedInfoResponse = await ApiCalls.userSelectedInput(
        userData,
        userSelected,
        page
      );
      if (userSelectedInfoResponse.ok) {
        const userSelectedInfoData = await userSelectedInfoResponse.json();
        setUserSelectedInfo(userSelectedInfoData);
        setUserSelectedInfoLoading(true);
        const calTotalPages = Math.ceil(
          userSelectedInfoResponse.headers.get("X-Total") / Constants.per_page
        );
        setTotalPages(calTotalPages);
      } else {
        alert(
          "Error fetching user profile:",
          userSelectedInfoResponse.statusText
        );
      }
    },
    [page,setUserSelectedInfo,userData]
  );

  const handleUserSelected = (items) => {
    setPage(1);
    setUserSelected(items);
    setUserSelectedInfoLoading(false);
    userSelectedInformation(
      userData.username,
      Constants.userPhoColSta[items],
      page
    );
  };

  const handleLikes = async (photoId, photoLikeStatus) => {
    setUserSelectedInfoLoading(false);
    try {
      const response = await ApiCallPhotos.likeUnlikePhotos(
        photoId,
        photoLikeStatus
      );
      if (response.ok) {
        const responseData = await response.json();
        alert("Unliked the image");
        userSelectedInformation(userData.username, userSelected, page);
      }
    } catch (error) {
      alert("Error:", error.message);
    }
  };

  useEffect(() => {
    if (!props.username) {
      if (!userData) {
        getProfileDetails();
      } else {
        userSelectedInformation(userData.username, userSelected, page);
      }
    } else {
      if (!userData) {
        getPublicUserProfile();
      } else {
        userSelectedInformation(props.username, userSelected, page);
      }
    }
  }, [page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      {userDataLoading ? (
        <div>
          <div className="user-avatar-name-edit">
            <div className="user-avatar-name">
              <img src={userData.profile_image.large} rounded />
              <div className="user-fullname">
                <h1>
                  {userData.first_name} {userData.last_name}
                </h1>
              </div>
            </div>
            {sessionStorage.getItem("userID") === userData.id && (
              <button
                className="edit-profile-button"
                onClick={() => {
                  setEditState(true);
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
          {editState ? (
            <EditProfile
              userData={userData}
              setEditState={setEditState}
              getProfileDetails={getProfileDetails}
            />
          ) : (
            ""
          )}

          <div className="user-select-options">
            <span
              onClick={() => handleUserSelected("photos")}
              className={userSelected === "photos" ? "selected" : ""}
            >
              Photos
            </span>
            <span
              onClick={() => handleUserSelected("likes")}
              className={userSelected === "likes" ? "selected" : ""}
            >
              Likes
            </span>
            <span
              onClick={() => handleUserSelected("collections")}
              className={userSelected === "collections" ? "selected" : ""}
            >
              Collections
            </span>
            <span
              onClick={() => handleUserSelected("statistics")}
              className={userSelected === "statistics" ? "selected" : ""}
            >
              Stats
            </span>
          </div>
          <div className="user-selected-info">
            {userSelectedInfoLoading ? (
              userSelected === "photos" ? (
                userSelectedInfo && userSelectedInfo.length > 0 ? (
                  <PhotoSelected userSelectedInfo={userSelectedInfo} />
                ) : (
                  <p>No Photos</p>
                )
              ) : userSelected === "likes" ? (
                userSelectedInfo && userSelectedInfo.length > 0 ? (
                  <UserLikedPhotos
                  userID={userData.id}
                    userSelectedInfo={userSelectedInfo}
                    handleLikes={handleLikes}
                  />
                ) : (
                  <p>No Liked Photos</p>
                )
              ) : userSelected === "collections" ? (
                userSelectedInfo && userSelectedInfo.length > 0 ? (
                  <SelectedCollections userSelectedInfo={userSelectedInfo} userSelectedInformation={userSelectedInformation} userData={userData}/>
                ) : (
                  <p>No Collections</p>
                )
              ) : userSelected === "statistics" ? (
                userSelectedInfo ? (
                  <SelectedStats userSelectedInfo={userSelectedInfo} />
                ) : (
                  <p>No Statistics</p>
                )
              ) : (
                <p>""</p>
              )
            ) : (
              <p>Loading</p>
            )}
          </div>
          {userSelectedInfo && userSelectedInfo.length > 0 && (
            <div className="pagination-buttons">
              <button onClick={handlePrevPage} disabled={page === 1}>
                Previous Page
              </button>
              <p>{page}</p>
              <button onClick={handleNextPage} disabled={page === totalPages}>
                Next Page
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};
