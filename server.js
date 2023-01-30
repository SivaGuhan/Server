const express=require("express");

const app=express();

const bodyParser=require("body-parser");

const cors=require("cors");

require("dotenv").config();

const mongoose=require("mongoose");

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://SivaGuhan:sivaguhan@cluster0.3rhrpsr.mongodb.net/MyBlog?retryWrites=true&w=majority",{useNewUrlParser:true});

const Schema=new mongoose.Schema({
    title:"String",
    content:"String"
});

const Cont=mongoose.model("Article",Schema);

app.use(cors());

app.use(bodyParser.json());

app.post("/post",async(req,res)=>{
    const {title,content}=req.body;
    const cont=new Cont({
        title,
        content
    })
    cont.save();
})

app.get("/",async(req,res)=>{
    Cont.find(async(err,result)=>{
        res.json(result);
    })
})

app.post("/del",async(req,res)=>{
    const {name}=req.body;
    Cont.deleteOne({title:name},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully deleted");
        }
    });
})

app.post("/edit",async(req,res)=>{
    const {oldTitle,newTitle,newContent}=req.body;
    Cont.updateOne({title:oldTitle},{title:newTitle,content:newContent},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Successfully updated");
        }
    })
})
app.listen(process.env.PORT || 5000,()=>{
    console.log("Server started");
})