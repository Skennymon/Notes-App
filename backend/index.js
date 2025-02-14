require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req,res) => {
    res.json({ data: "Hello "});
});

// Create Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if(!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required"});
    }

    if(!password) {
        return res.status(400).json({ error: true, message: "Password is required"});
    }

    const isUser = await User.findOne({ email: email });

    if(isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if(!email) {
        res.status(400).json({
            message: "Email is required"
        });
    }
    else if(!password) {
        res.status(400).json({
            message: "Password is required"
        });
    }

    const userInfo = await User.findOne({email: email});

    if(!userInfo) {
        return res.status(400).json({ message: "User not found"});
    }

    if(userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24 * 365 * 10,
        });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
           
    }
    else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        });
    }
});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if(!title) {
        res.status(400).json({
            error: true,
            message: "Please enter title!"
        });
    }
    else if(!content) {
        res.status(400).json({
            error: true,
            message: "Please enter content!"
        })
    }
    else {
        try {
            const note = new Note({
                title,
                content,
                tags: tags || [],
                userId: user._id,
            });
    
            await note.save();
            
            return res.json({
                error: false,
                note,
                message: "Note added successfully",
            });
        }
        catch(error) {
            return res.status(500).json({
                error: true,
                message: "Internal Server Error hehe"
            });
        }
    }


    

});

// Edit Note
app.delete("/edit-note/:noteId", authenticateToken, async(req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if(!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id }); //find the note with its object id and user id

        if(!note) {
            return res.status(400).json({ error: true, message: "Note doesn't exist"});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            message: "Note successfully edited"
        });
    }
    catch(error) {
        res.status(500).json({
            error: true,
            message: "Server is fucked up"
        });
    }
});

// Get All Notes
app.get("/get-all-notes", authenticateToken, async(req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({userId: user._id}).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "Successfully acquired notes for user"
        });
    }
    catch(error) {
        res.status(500).json({
            error: true,
            message: "We fucked up"
        });
    }
});

// Delete Notes
app.post("/delete-note/:noteId", authenticateToken, async(req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note) {
            res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        await Note.deleteOne({_id: noteId, userId: user._id});

        return res.json({
            error: false,
            message: "Note successfully deleted"
        });
    }
    catch(error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }


});

// Update isPinnedValue
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note) {
            return res.status(400).json({
                error: true,
                message: "Note not found"
            });
        }

        note.isPinned = isPinned;
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note successfully pinned"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        })
    }
})

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const isUser = await User.findOne({_id: user._id});

    if(!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: {fullName: isUser.fullName, email: isUser.email, password: isUser.password, _id: isUser._id},
        message: "",

    });
});



// listen for api calls on port 8000
app.listen(8000);
module.exports = app;

