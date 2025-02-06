const express = require("express")
const connectDB = require('./config/database');
const app = new express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//find usr by email

// app.get('/user',userAuth, async (req, res) => {
//     let userEmail = req.body.emailId;
//     try {
//         const users = await User.findOne({ emailId: userEmail });
//         if (users.length === 0) {
//             res.status(404).send("user not found");
//         } else {
//             res.send(users);
//         }

//     } catch (err) {
//         res.status(401).send("error occured " + err.message);
//     }
// })

// //Feed api: Get all users from database
// app.get('/feed',userAuth, async (req, res) => {
//     try {
//         const users = await User.find({});
//         if (users.length === 0) {
//             res.status(404).send("no users");
//         } else {
//             res.send(users);
//         }

//     } catch (err) {
//         res.status(401).send("error occured " + err.message);
//     }
// })

// app.delete('/deleteUser',userAuth, async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const user = await User.findByIdAndDelete(userId);
//         res.send('user deleted');
//     }
//     catch (err) {
//         res.status(401).send("error occured " + err.message);
//     }
// })

// app.patch('/updateUser/:userId',userAuth, async (req, res) => {
//     const data = req.body;
//     const userId = req.params.userId;

//     try {
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//         const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
//         if (!isUpdateAllowed) {
//             throw new Error("update not allowed");
//         }
//         if (data.skills?.length > 10) {
//             throw new Error("Only 10 skills are allowed");
//         }
//         await User.findByIdAndUpdate({ _id: userId }, data, { runValidators: true });
//         res.send('user updated');
//     }
//     catch (err) { res.status(401).send("error occured: " + err.message); }
// })

connectDB().then(() => {
    console.log('database connected');

    app.listen(3000, () => {
        console.log('server succeefully created');
    });
}).catch(err => console.log('coonection error ' + err));

