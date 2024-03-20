import { HomePage } from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";
import { PhotoDetailsPage } from "../pages/PhotoDetailsPage";
import { SearchPage } from "../pages/SearchPage";
import {UserDetailsPage} from '../pages/UserDetailsPage'
import { CollectionsPage } from "../pages/CollectionsPage";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {sessionStorage.getItem("accessToken") !==null &&
        <Route path="/profile-page" element={<ProfilePage />} /> 
      }
      
      <Route path="/photos/:id" element={<PhotoDetailsPage/>}/>
      <Route path="/search" element={<SearchPage/>}/>
      <Route path="/userDetails/:username" element={<UserDetailsPage/>}/>
      <Route path='/collection/:id' element={<CollectionsPage/>}/>
    </Routes>
  );
};
