const express = require('express');
const mongoose = require('mongoose');
const Girl = require('../models/GirlModel');
const multer = require('multer');

const router = express.Router();

// MULTER SETUP (Store images as raw Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET ALL GIRL POSTS 
router.get('/', async (req, res) => {
    try {
        const retrievedPosts = await Girl.find().select('-coverImage.data'); // Exclude image binary
        res.status(200).json({
            message: "ALL GIRL POSTS RETRIEVED SUCCESSFULLY",
            posts: retrievedPosts,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET SINGLE POST 
router.get('/:id', async (req, res) => {
    try {
        const retrievedPost = await Girl.findById(req.params.id);
        if (!retrievedPost) {
            return res.status(404).json({ message: "POST NOT FOUND" });
        }

        res.status(200).json({
            message: "ALL GIRL POSTS RETRIEVED SUCCESSFULLY",
            post: retrievedPost,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// GET AN IMAGE SEPERATELY
router.get('/image/:id', async (req, res) => {
    try {
        const post = await Girl.findById(req.params.id);
        if (!post || !post.coverImage) {
             return res.status(404).json({ message: "IMAGE NOT FOUND" }) 
        };

        res.set('Content-Type', post.coverImage.contentType);
        res.send(post.coverImage.data);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// CREATE A GIRL POST 
router.post('/create-post', upload.single("coverImage"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "PROVIDE AN IMAGE FILE" });

        const newPost = new Girl({
            ...req.body,
            coverImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            }
        });

        await newPost.save();

        res.status(201).json({
            message: "GIRL POST CREATED SUCCESSFULLY",
            post: newPost,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// PATCH A GIRL POST
router.patch('/update-post/:id', upload.single("coverImage"), async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (req.file) {
            updateData.coverImage = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }
        // { new: true } REQUIRED
        const updatedPost = await Girl.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.status(200).json({
            message: "GIRL POST PATCHED SUCCESSFULLY",
            post: updatedPost,
        });

    } catch (error) {
        res.status(500).json({ error });
    }
});

// DELETE A POST
router.delete('/delete-post/:id', async (req, res) => {
    try {
        const deletedPost = await Girl.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ message: "POST NOT FOUND" })
        };

        res.status(200).json({
            message: "GIRL POST DELETED SUCCESSFULLY",
            post: deletedPost,
        });

    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
