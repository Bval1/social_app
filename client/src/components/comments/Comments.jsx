import "./comments.scss"
import { useContext, useState } from "react"
import {AuthContext} from "../../context/authContext"
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios';
import moment from "moment";
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Comments = ({postId}) => {

    const [desc, setDesc] = useState("");
    const {currentUser} = useContext(AuthContext);

    const { isLoading, error, data } = useQuery( ['comments'], () => 
        makeRequest.get("/comments?postId=" + postId).then(res => {
            return res.data;
        })
    );

  const queryClient = useQueryClient();
    
  const mutation = useMutation((newComment) => {
            return makeRequest.post("/comments", newComment);
        }, 
        {
            onSuccess: () => {
            queryClient.invalidateQueries(["comments"]) // query name is posts from Posts.jsx
            },
        }
    )

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({desc, postId});   // names must match database fields
    setDesc("");
  };

  return (
    <div className='comments'>
        <div className="write">
            <img src={"/uploads/" + currentUser.profilePic} alt="" />
            <input type="text" placeholder="write a comment"
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} />
            <button onClick={handleClick}>Send</button>
        </div>

        {isLoading ? "loading..." : data.map( (comment) => (
            <div className="comment" key={comment.id}>
                <img src={"/uploads/" + comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
        ))}
    </div>
  )
}

export default Comments