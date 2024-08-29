const express= require('express');
const mysql=require('mysql');
const cors=require('cors');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database:'cards'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


const app= express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cors({
    origin:["http://127.0.0.1:5173"],
    methods:["PUT","post", "get",],
    credentials:true
  }));

const port=8000;

// end point to checking server
app.get('/ping',(req, res)=>{
    console.log("servers running");
})



// end point to create card.
app.post('/cards', (req, res)=>
    {
        const{title, description}=req.body;
        
       const sql='INSERT into card (title, description) values(?,?)';
       con.query(sql, [title, description],(err, result)=>{
            if(err)
            {
                console.log(err);
            }

               return res.status(200).json({success:"User registered"});
            

        })
       
        
    })

    app.get('/cards', (req, res)=>{

        
        
        const sql='Select* from card';
        con.query(sql,(err, result)=>{
            if(err)
            {
                return res.status(501).json({error:"internal server error"})
            }
            console.log();
            res.send(result);
            return;


        })
    })

app.get('/card/:title',(req, res)=>{
    const {title}=req.params;

    const sql='select * from card where title=?'

    con.query(sql,[title], (err, result)=>{
        if(err)
            {
                return res.status(501).json({error:"internal server error"});
            }

            if(result.length===0)
            {
                console.log("enter valid card name");
                return res.status(401).json({msg:"Enter valid card name"});
            }

            res.send(result);
            return;
    })
})

app.listen(port, ()=>{
    console.log(`server in running at port ${port}`);
})