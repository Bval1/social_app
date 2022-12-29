import "./leftbar.scss"
import React, { useContext } from 'react'
import Friends from "../../assets/friends.png";
import Events from "../../assets/event.png";
import Fundraiser from "../../assets/fundraiser.png";
import Gallery from "../../assets/gallery.png";
import Gaming from "../../assets/gaming.png";
import Groups from "../../assets/groups.png";
import Market from "../../assets/market.png";
import Memories from "../../assets/memories.png";
import Messages from "../../assets/messages.png";
import Play from "../../assets/play.png";
import Tutorials from "../../assets/tutorials.png";
import Video from "../../assets/video-camera.png";
import Courses from "../../assets/courses.png";
import { AuthContext } from "../../context/authContext";

const LeftBar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={"/uploads/" + currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Play} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
          <hr/>
          <div className="menu">
            <span>Your shortcuts</span>
            <div className="item">
              <img src={Events} alt="" />
              <span>Events</span>
            </div>
            <div className="item">
              <img src={Gaming} alt="" />
              <span>Gaming</span>
            </div>
            <div className="item">
              <img src={Gallery} alt="" />
              <span>Gallery</span>
            </div>
            <div className="item">
              <img src={Video} alt="" />
              <span>Videos</span>
            </div>
            <div className="item">
              <img src={Messages} alt="" />
              <span>Messages</span>
            </div>
          </div>
          <hr/>
          <div className="menu">
            <span>Others</span>
            <div className="item">
              <img src={Fundraiser} alt="" />
              <span>Fundraiser</span>
            </div>
            <div className="item">
              <img src={Tutorials} alt="" />
              <span>Tutorials</span>
            </div>
            <div className="item">
              <img src={Courses} alt="" />
              <span>Courses</span>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default LeftBar