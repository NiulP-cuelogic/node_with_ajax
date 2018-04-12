import express from "express";
import user from "../controller/userController";
import app from "../app";
import User from "../models/user";
import Validation from "../middleware/validation";
import authController from "../middleware/authentication";

const router = express.Router();


router.post("/",Validation.validate,user.signup);

router.post("/userDetails",authController.checkToken,user.userDetails);

router.post("/userDetails/edit",authController.checkToken,user.edit);

router.post('/userDetails/update',authController.checkToken,user.update);

router.post('/signin',Validation.validate,user.login);

router.post('/signin/admin',authController.checkToken,user.admin);

router.post('/signin/admin/save/:id',authController.checkToken,Validation.checkObjectId,user.admin_save);

router.post('/signin/admin/delete/:id',authController.checkToken,user.admin_delete);

router.post('/signin/admin/search',authController.checkToken,user.admin_search);

router.post('/signin/admin/getActivity',authController.checkToken,user.getActivity);

export default router;