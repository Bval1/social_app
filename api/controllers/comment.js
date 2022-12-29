import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getComments = (req, res) => {

    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c 
    JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ?
    ORDER BY c.createdAt DESC`;

    // req.query.postId = last part of endpoint in "/comments?postId="
    db.query(q, [req.query.postId], (error, data) => { 
        if (error) return res.status(500).json(error);
        return res.status(200).json(data);
    });
}

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (error, userInfo) => {
        if(error) return res.status(403).json("Token is not valid");
        
        
        const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";

        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ];
    
        db.query(q, [values], (error, data) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json("Comment has been created");
        });
    })
}
