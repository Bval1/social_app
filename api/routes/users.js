import  express  from "express";
import { getUser, updateUser } from "../controllers/user.js";


const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);  // does not need userid since it uses jwt to validate current user


export default router;