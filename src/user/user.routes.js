import { Router } from "express";
import {
  getUsers,
  deleteUser,
  updateUser,
  updateRole,
} from "./user.controller.js";
import {
  deleteUserValidator,
  updateUserValidator,
  updateRoleValidator
} from "../middlewares/user-validators.js";

const router = Router();


router.get("/", getUsers);

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);


router.put("/updateUser/:uid", updateUserValidator, updateUser);

router.patch("/updateRole/:uid", updateRoleValidator, updateRole);

export default router;
