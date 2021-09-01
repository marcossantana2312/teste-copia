const express = require ('express');
const userController = require ('./controllers/userController');

const router = express.Router ();
router.route("/user")
    .post(userController.registerUser)
    // .get(getUsers);
router.post("/signin", userController.signin)
module.exports = router;
