import express from "express";
import bcrypt from "bcrypt";
import UserModel from "./models/user-model.js";

const router = express.Router();

const checkIsPhoneNumber = (credential) => {
    console.log("1");
    if (credential.length !== 8) return false;
    console.log("2");
    if (isNaN(Number(credential))) return false;
    console.log("3");
    const firstCharacter = credential[0];
    if (!["9", "8", "7", "6"].includes(firstCharacter)) return false;
    console.log("4");
    return true;
};

const checkIsEmail = (credential) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(credential);
};

router.post("/signup", async (req, res) => {
    const { credential, password, fullname, username } = req.body;
    if (!credential || credential === "") {
        return res.status(400).send({ message: "Email or Phone required!" });
    }
    if (!password || password === "") {
        return res.status(400).send({ message: "Password required!" });
    }
    if (!fullname || fullname === "") {
        return res.status(400).send({ message: "Fullname required!" });
    }
    if (!username || username === "") {
        return res.status(400).send({ message: "Fullname required!" });
    }
    // BUH TALBAR UTGATAI BAIGAA

    const isPhoneNumber = checkIsPhoneNumber(credential);
    const isEmail = checkIsEmail(credential);

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).send({ message: "Email already registered!" });

    bcrypt.hash(password, 10, async function (err, hash) {
        const newUser = { email, password: hash };
        await UserModel.create(newUser);
        return res.status(201).send(newUser);
    });
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) return res.status(400).send({ message: "Email or password not correct!" });
    bcrypt.compare(password, existingUser.password, function (err, result) {
        if (!result) {
            return res.status(400).send({ message: "Email or password not correct!" });
        } else {
            return res.status(200).send({ message: "Welcome" });
        }
    });
});

export default router;