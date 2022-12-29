import "./post.scss"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import moment from "moment/moment.js";
import { makeRequest } from '../../axios';
import { AuthContext } from "../../context/authContext"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const Post = ({post}) => {

    const [commentOpen, setCommentOpen] = useState(false);
    const {currentUser} = useContext(AuthContext);
    
    const { isLoading, error, data } = useQuery( ['likes', post.id], () => 
        makeRequest.get("/likes?postId=" + post.id).then(res => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();
    
    // mutations are used to see the results immediately
    const mutation = useMutation((liked) => {
        if (liked) return makeRequest.delete("/likes?postId=" + post.id);
        return makeRequest.post("/likes", {postId: post.id});
      
      }, 
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["likes"]) 
        },
      }
    );

    const handleLike = () => {
        mutation.mutate(data && data.includes(currentUser.id));
    };
    //console.log(data);

  return (
    <div className="post">
        <div className="container">
            <div className="user">
                <div className="userInfo">
                    <img src={"/uploads/" + post.profilePic} alt="" />
                    <div className="details">
                        <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                            <span className="name">{post.name}</span>
                        </Link>
                        <span className="date">{moment(post.createdAt).fromNow()}</span>
                    </div>
                </div>
                <MoreHorizOutlinedIcon/>
            </div>
            <div className="content">
                <p>{post.desc}</p>
                <img src={"./uploads/" + post.img} alt="" />
            </div>
            <div className="info">
                <div className="item">
                    {isLoading ? "loading" : 
                    data && data.includes(currentUser.id) ? 
                    <ThumbUpIcon onClick={handleLike} /> : <ThumbUpOutlinedIcon onClick={handleLike}/>}
                 
                    {data ? data.length + " likes" : "0 likes"} 
                </div>
                <div className="item" onClick={() =>setCommentOpen(!commentOpen)}>
                    <ChatBubbleOutlineOutlinedIcon/>
                    10 comments
                </div>
                <div className="item">
                    <ShareOutlinedIcon/>
                    Share
                </div>
            </div>
            {commentOpen && <Comments postId={post.id} />}
        </div>
    </div>
  )
}

export default Post