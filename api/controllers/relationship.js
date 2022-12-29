import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {    

    const q = "SELECT followerUserId from relationships WHERE followedUserId = ?";

    db.query(q, [req.query.followedUserId], (error, data) => {
        if (error) return res.status(500).json(error);
        return res.status(200).json(data.map(relationship => relationship.followerUserId));
    });  
}

export const addRelationship = (req, res) => {    

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (error, userInfo) => {
        if(error) return res.status(403).json("Token is not valid");
        
        
        const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.userId,
        ];
    
        db.query(q, [values], (error, data) => {
            if (error) return res.status(500).json(error);
            return res.status(200).json("Following User");
        });
    })
}


export const deleteRelationship = (req, res) => {    

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (error, userInfo) => {
        if(error) return res.status(403).json("Token is not valid");
        
        
        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

        db.query(q, [userInfo.id, req.query.userId], (error, data) => {
            //console.log(req.query.postId)
            if (error) return res.status(500).json(error);
            return res.status(200).json("Unfollowing User");
        });
    })
}