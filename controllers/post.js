const Post=require('../models/post')
const slugify=require('slugify')

exports.create=(req,res)=>{
//    console.log(req.body)
const{title,content,user}=req.body //req.params

const slug=slugify(title)
// validate
switch(true){
    case !title:
        return res.status(400).json({
            error:'Title is required'
        })
        break;
    case !content:
        return res.status(400).json({
            error:'Content is required'
        })
        break;
}
// create
Post.create({title,content,user,slug},(err,post)=>{
    if(err){
        console.log(err)
        res.status(400).json({error:'Duplicate post. try another title'})
    }
    res.json(post)
})
} 
exports.list=(req,res)=>{
    Post.find({}).exec((err,posts)=>{
        if(err)console.log(err)
        res.json(posts)
    })

}
exports.read=(req,res)=>{
    const {slug}=req.params
    Post.findOne({slug}).exec((err,post)=>{
        if(err)console.log(err)
        res.json(post)
    })
}

exports.update=(req,res)=>{
    const {slug}=req.params
    const {title,content,user}=req.body
    Post.findOneAndUpdate({slug},{title,content,user},{new:true}).exec((err,post)=>{
        if(err) console.log(err)
        res.json(post)
    })
}
exports.remove=(req,res)=>{
    const {slug}=req.params
    Post.findOneAndRemove({slug}).exec((err,post)=>{
        if(err)console.log(err)
        res.json({
            message:'Post deleted'
        })
    })
}