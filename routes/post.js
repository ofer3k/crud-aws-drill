const express=require('express')
const router = require('express').Router(); 

// import controllers methods
const {create,list,read,update,remove,postImg}=require('../controllers/post');

// router.post('/post/img',postImg)
router.post('/post',create)
router.get('/posts',list)
router.get('/posts/:slug',read)
router.put('/post/:slug',update)
router.delete('/posts/:slug',remove)

module.exports=router