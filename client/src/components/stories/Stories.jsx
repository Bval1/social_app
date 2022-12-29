import React from 'react'
import { useContext } from 'react';
import {AuthContext} from "../../context/authContext"
import "./stories.scss"
const Stories = () => {

    const {currentUser} = useContext(AuthContext);

    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13336772/pexels-photo-13336772.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
        },
        {
            id: 2,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13336772/pexels-photo-13336772.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
        },
        {
            id: 3,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13336772/pexels-photo-13336772.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
        },
        {
            id: 4,
            name: "John Doe",
            img: "https://images.pexels.com/photos/13336772/pexels-photo-13336772.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
        },
    ];

  return (
    <div className='stories'>
        <div className="story">
                <img src={"/uploads/" + currentUser.coverPic} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
        </div>
        {stories.map(story => (
            <div className="story" key={story.id} >
                <img src={story.img} alt="" />
                <span>{story.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Stories