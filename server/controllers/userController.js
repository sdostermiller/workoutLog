const router = require("express").Router();
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize");



router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
    const newUser =await UserModel.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 15),
    });

    let token = jwt.sign({id: newUser.id, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});


res.status(201).json({
    message: "User registered!",
    user: newUser,
    sessionToken: token
})
} catch (e) {
if(e instanceof UniqueConstraintError){
    res.status(409).json({
        message: "Email already in use."
    })
} else {
    res.status(500).json({
        message: "Unable to register user",
        error: e
    })
}


}
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
     let loginUser = await UserModel.findOne({
        where: {
            email,
        },
    });
    if (loginUser) {

    let passwordComparison = await bcrypt.compare(password, loginUser.password);
    
    if (passwordComparison) {

    let token = jwt.sign({id: loginUser.id, email: loginUser.email}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    res.status(200).json({
        user: loginUser,
        message: "User successfully logged in!",
        sessionToken: token
    });
} else {
    res.status(401).json({
        message: "Incorrect email or password"
    })
}}
} catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

module.exports = router;