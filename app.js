var express = require ("express");
var bodyParser= require ("body-parser");
var mongoose = require ("mongoose");
const app = express();

// mongoose.connect("mongodb://localhost:27017/todoDatabase",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connect("mongodb+srv://Aanchal:Aanchal18@cluster0.3v8ta.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true } , (err)=>{
    if (!err)
    {
        console.log('success connected');
    }
    else
    {
        console.log("error");
    }
});
const itemSchema={
    name:String
}
  
const Item= mongoose.model("Item",itemSchema);
// const item1 = new Item({
//     name:"swim"});


// const item2 = new Item({
//         name:"dance"});
// const d=[item1,item2];

app.set('view engine','ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true})); 
app.get('/',(req,res)=>{
Item.find({},function(err,f){
//     //  console.log(f);
//     if(f.length===0){
//    Item.insertMany(d,(err)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log("success")
//     }
// });
// res.redirect("/");}
// else{
    // res.render("list",{newlistitem:f})}
    res.render("list",{newlistitem:f})
})
    
});

app.post("/",function(req,res){
const itemName= req.body.n;
//  i1.push(i);
// console.log(i);  
// res.render("list",{newlistitem:i});
// res.redirect("/");
const item= new Item({
    name:itemName  
});
item.save();
res.redirect("/");
});

app.post("/delete",function(req,res){
    const check= (req.body.checkbox);
    Item.findByIdAndRemove(check,function(err){
        if(!err){
            console.log("successfull deletion");  
            res.redirect("/");
        }
    })
})
app.listen("4000");