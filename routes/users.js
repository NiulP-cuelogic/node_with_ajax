import express from "express";
import user from "../controller/userController";
import app from "../app";
import User from "../models/user";
import Validation from "../middleware/validation";

const router = express.Router();

// user.signup();

router.post("/",Validation.validate,user.signup);
router.post("/userDetails",user.userDetails);
router.post("/userDetails/edit",user.edit);
router.post('/userDetails/update',user.update);
router.post('/signin',Validation.validate,user.login);
router.get('/signin/admin',user.admin);
router.post('/signin/admin/save/:id',Validation.checkObjectId,user.admin_save);
router.post('/signin/admin/delete/:id',user.admin_delete);
router.post('/signin/admin/search',user.admin_search);

export default router;