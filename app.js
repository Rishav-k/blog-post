const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _=require("lodash")
const home= "welcome to our blog post page. hi i am rishav i post blogs on animals on daily basis , i hope that you will love to read my post.keep following my page on instagram and facebook too it must be helpful for you all .";
const contact="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const about="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let posts=[];
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' , 'ejs')
app.use(express.static("public"));

app.get("/",function(req,res){
   res.render("home",{pagename:"HOME" , pagecontent: home,posts:posts});
});
app.get("/about",function(req,res){
    res.render("home",{pagename: "ABOUT US",pagecontent: about})
  });

app.get("/contact",function(req,res){
    res.render("home",{pagename: "CONTACT" , pagecontent: contact})
  });

app.get("/compose",function(req,res){
   res.render("compose");
});

app.get("/posts/:postName", function(req,res){
    const requestedTitle=_.lowerCase(req.params.postName);

    posts.forEach(function(post){
        const storedTitle=_.lowerCase(post.title);
        if(storedTitle === requestedTitle){
            res.render("post",{title:post.title,content:post.content});
        }
    });


      
});


app.post("/compose",function(req,res){
    const post={
        title:req.body.topic,
        content:req.body.content
    };
    console.log(post);
    console.log(posts);
   posts.push(post);
   res.redirect("/");
});

 

app.listen(3000,function(req,res){
  console.log("server started on port 3000")
});