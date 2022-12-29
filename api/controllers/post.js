import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getPosts = (req, res) => {
    const userId = req.query.userId;    // if theres a userId it means we're in profile page

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (error, userInfo) => {
        if(error) return res.status(403).json("Token is not valid");
        
        // followerUserId should be our userId (?); userId is a string, "undefined" if null
        const q = userId  != "undefined" ? `SELECT p.*, u.id AS userId, name, profilePic 
        
        FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        WHERE p.userId = ? ORDER BY p.createdAt DESC`
        :
        `SELECT p.*, u.id AS userId, name, profilePic 
        FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
        ORDER BY p.createdAt DESC`;
        
        const values = userId != "undefined" ? [userId] : [userInfo.id, userInfo.id]
        
        db.query(q, values, (error, data) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json(data);
        });
    })

}

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (error, userInfo) => {
        if(error) return res.status(403).json("Token is not valid");
        
        // followerUserId should be our userId (?)
        const q = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id

        ]
    
        db.query(q, [values], (error, data) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json("Post has been created");
        });
    })
}