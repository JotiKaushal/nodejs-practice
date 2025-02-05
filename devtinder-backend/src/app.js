const express = require("express")
const connectDB = require('./config/database');
const app = new express();
const User = require('./Models/user');
const { validateUserData, validateLogin } = require('./utils/validation');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());

app.post('/login', async (req, res) => {

    try {
        const { emailId, password } = req.body;
        await validateLogin(emailId, password);
        const user = await User.findOne({ emailId: emailId });
        //reate jwttoken
        const token = await user.getJWT();
        //add token to cookie & send response back to user
        res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
        res.send("login successfully");
    } catch (err) {
        res.status(401).send("error occured " + err.message);
    }
})


app.post('/signup', async (req, res) => {
    // const user = new User({
    //     firstName: 'Atharv',
    //     lastName: 'Rana',
    //     emailId: 'atharv@gmail.com',
    //     password: '12345',
    //     gender: 'Male'
    // });
    try {

        //validate data
        validateUserData(req);
        const { firstName, lastName, emailId, password, gender } = req.body;
        //encrypt password
        const passwordHash = await bcrypt.hash(password, 10);
        //create user
        const user = new User({ firstName, lastName, emailId, password: passwordHash, gender });
        const exitingUser = await User.findOne({ emailId: user.emailId });
        if (exitingUser && exitingUser.length > 0) {
            res.status(401).send("email already exist");
        } else {
            await user.save();
            res.send("user added successfully");
        }

    } catch (err) {
        res.status(401).send("error occured " + err.message);
    }
})


app.get('/profile',userAuth, async (req, res) => {
    res.send(req.user.firstName+" profile fetched successfully");
})

app.post('/sendConnectionRequest', userAuth, async (req, res) => {
    res.send(req.user.firstName + "sent connection request");
})
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

