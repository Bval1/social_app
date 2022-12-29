import "./navbar.scss"
import React, { useContext } from 'react'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const NavBar = () => {
    const {toggle, darkMode} = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
        <div className="left">
            <Link to="/" style={{textDecoration: "none"}}>
                <span>SocialMediaApp</span>
            </Link>
            <CottageOutlinedIcon/>
            {darkMode ? <LightModeOutlinedIcon onClick={toggle}/> :
            <DarkModeOutlinedIcon onClick={toggle}/> }
            <AppsOutlinedIcon/>
            <div className="search">
                <SearchOutlinedIcon/>
                <input type="text" placeholder="Search" />
            </div>
        </div>
        <div className="right">
            <Person2OutlinedIcon/>
            <EmailOutlinedIcon/>
            <NotificationsNoneOutlinedIcon/>
            <div className="user">
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
            </div>
        </div>
    </div>
  )
}

export default NavBar