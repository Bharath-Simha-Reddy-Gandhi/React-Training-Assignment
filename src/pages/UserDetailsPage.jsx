import { useParams } from "react-router-dom"
import { ApiCalls } from "../components/ApiCalls";
import { ProfileDeatils } from "../components/ProfileDeatils";
import { Header } from "../components/Header";

export const UserDetailsPage = () =>{

    const {username} = useParams();
    
    return(
        <>
        <Header/>
        <ProfileDeatils username={username}/> 
       
        </>
    )
}