import express from "express";
const routerAdmin = express.Router(); 
import adminController from "./controllers/admin-controller";
import productController from "./controllers/product-controller";
import makeUploader  from "./libs/utils/uploader";

/** Admin */
routerAdmin.get("/", adminController.goHome);

routerAdmin
  .get("/login", adminController.getLogin)
  .post("/login", adminController.processLogin);

routerAdmin
  .get("/signup", adminController.getSignup)
  .post(
    "/signup", 
    makeUploader("members").single("memberImage"), 
    adminController.processSignup
  );

routerAdmin.get("/logout", adminController.logout);
routerAdmin.get("/check-me", adminController.checkAuthSession);


/** Product */
routerAdmin.get("/product/all",adminController.verifyAdmin , productController.getAllProducts);


routerAdmin.post(
    "/product/create",
    adminController.verifyAdmin,
    makeUploader("products").array("productImages", 3), //uploads folder ichidagi products folderga 
    productController.createNewProduct);


routerAdmin.post("/product/:id", adminController.verifyAdmin , productController.updateChosenProduct);

/** User */

routerAdmin.get("/user/all", adminController.verifyAdmin, adminController.getUsers);
routerAdmin.post("/user/edit", adminController.verifyAdmin, adminController.updateChosenUser);


export default routerAdmin; 
