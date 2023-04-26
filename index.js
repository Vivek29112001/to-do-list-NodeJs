const express=require("express");
const app=express();
const port=8080;
const db=require('./config/mongoose');
const Todolist=require('./models/todolist');

app.set("view engine","ejs");
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));

// for get request
app.get('/',function(req,res){
    Todolist.find({},function(err,todolist){
        if(err){
            console.log("Some error in db : ",err);
        }
        return res.render("index",{
            todo_list: todolist
        });
    });

})

// for post request
app.post('/new-todo-list',function(req,res){
    console.log(req.body);
    Todolist.create({
        title: req.body.title,
        status: req.body.category,
        date: req.body.date
    });
    return res.redirect('back');
});

// delete 
app.get('/delete-list',function(req,res){
    let id=req.query.id;

    Todolist.findByIdAndDelete(id,function(err){
        if(err){
            console.log("some error in here");
        }
    });

    return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log("Some error in this server >> ",err);
        return;
    }

    console.log("OK ! your server is running ......");
});