

let datab={
    host:"localhost",
    user:"root",
    password:"cdac",
    database:"que2",
    port:3306
   };
   const express = require('express');
   const app = express();
   const mysql=require("mysql2");
   const con=mysql.createConnection(datab);
   app.use(express.static('sf'));
   
   app.get('/Blur', function (req, res) {
    let data={status:false,Bookdata:[]};
    let input=req.query.input;
    con.query("select * from book where bookid=?",[input],(err,rows)=>{
   
     if(err){
      console.log("details not found");
     }else{
      if(rows.length>0){
       console.log("details found");
       data.status=true;
       data.Bookdata=rows;
      }
     }
   
     res.send(data);
    });
   
    });
   
   app.get('/Update',(req,res)=>{
    let data={status:false};
    let input={bookid:req.query.bookid,price:req.query.price};
    
    con.query("update book set price=? where bookid=?",[input.price,input.bookid],
    (err,resp)=>{
     if(err){
      console.log("Book not updated");
     }else{
      if(resp.affectedRows>0){
       console.log("details updated");
       data.status=true;
      }
     }
     res.send(data);
    });
   });
   
   
   app.listen(501, function () {
       console.log("server listening at port 501...");
   });