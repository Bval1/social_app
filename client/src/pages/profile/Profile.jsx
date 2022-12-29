import "./profile.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import Posts from "../../components/posts/Posts";

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);  // takes id from in "/users/find/{id}"

  const { isLoading, error, data } = useQuery(["user"], () => 
    makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
    })
  );

  
  const { isLoading: isLoadingRel, data: relationshipData } = useQuery(["relationship"], () => 
    makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
    })
  );

  console.log("Followers: ", relationshipData);
  
  const queryClient = useQueryClient();
    
  // mutations are used to see the results immediately
  const mutation = useMutation((following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships?userId=", { userId });
    
    }, 
    {
      onSuccess: () => {
        // Invalidate and refetch (update realtionship)
        queryClient.invalidateQueries(["relationship"]) 
      },
    }
  );

  const handleFollow = () => {
      mutation.mutate(relationshipData.includes(currentUser.id));
  };

  console.log("View profile: ", data);

  return (
    <div className='profile'>
      {isLoading ? "loading" : 
      <>
      <div className="images">
        <img src={"/uploads/" + data.coverPic}
          alt="" className="cover" />
        <img src={"/uploads/" + data.profilePic}
          alt="" className="profile" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookIcon fontSize="large"/>
            </a>
            <a href="http://linkedin.com">
              <LinkedInIcon fontSize="large"/>
            </a>
            <a href="http://instagram.com">
              <InstagramIcon fontSize="large"/>
            </a>
            <a href="http://twitter.com">
              <TwitterIcon fontSize="large"/>
            </a>
            <a href="http://pinterest.com">
              <PinterestIcon fontSize="large"/>
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <LocationOnIcon/>
                <span>{data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon/>
                <span>{data.website}</span>
              </div>
            </div>
            {isLoadingRel ? "loading" 
            : userId === currentUser.id ? 
              (<button onClick={() => setOpenUpdate(true)}>Update</button>) 
              : (<button onClick={handleFollow}>
                {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
                </button>)}
          </div>
          <div className="right">
            <AlternateEmailIcon/>
            <ExpandMoreIcon/>
          </div>
        </div>
        <Posts userId={userId}/>
      </div>
      </>
      }
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  )
}

export default Profile