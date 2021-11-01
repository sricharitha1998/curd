import express  from "express";
import cors from "cors";
import mongoose from "mongoose"
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
// app.use(express.urlencoded())
app.use(cors())
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost:27017/reactDB",{useNewUrlParser : true , useUnifiedTopology:true});

()=>{
    console.log("Connected")
}

const SetSchema = {
    username : String,
    age : Number
}

var User = mongoose.model("User",SetSchema);

app.get("/login",function(req,res){
    res.redirect("localhost:3000/login");
});

app.get("/",function(req,res){
    const getUserData = User.find()
    .then(foundData => res.json(foundData))
    return getUserData
    // res.redirect("localhost:3000/home");
});

app.post("/login",function(req,res){
    const user = new User(req.body);
    user.save();
    res.send("name"+req.body.username);
});

app.get("/update/:id",function(req,res)
{
    const userId = req.params.id;
    console.log(userId)
    const getUpdatedata = User.findOne({_id : userId},function(err,result)
    {
        if(err)
        {
            console.log(err)
        }else{
           res.send(result) ;
        //    console.log(result)
        }    
    });

 

    // res.send("http://localhost:3000/update")
    // console.log(User.findOne({_id : userId}))
    // const getUpdatedata = User.findOne({_id : userId})
    // .then(foundData => res.json(foundData))
    // console.log(JSON.stringify(getUpdatedata))
    // return getUpdatedata;
    // res.redirect("http://localhost:3000/update");
    // return getUpdatedata;
    
})

app.delete("/delete/:id",function(req,res){
    const userId = req.params.id;
// console.log(userId)
    User.findByIdAndRemove(userId,function(err)
    {
        if(err)
        {
            console.log(err);
        }else
        {
            console.log("Deleted Successfully");
            res.redirect("http://localhost:3000/");
        }
    });
    
});

app.post("/update/:id",function(req,res)
{
    const getUser =req.params.id;
    const user_details = req.body;
    console.log("get idddddddddddd "+getUser + "details "+ JSON.stringify(user_details) );
        User.findByIdAndUpdate(getUser,user_details,function(err)
        {
            if(!err)
            {
                console.log("Updated Successfully");
            }
        });
        res.redirect("/");
})
app.listen(4000,function()
{
    console.log("server started");
})