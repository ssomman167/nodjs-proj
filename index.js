const http = require("http");
const fs = require("fs");
const os = require("os");
const dns = require("node:dns");
const cowsay = require("cowsay");
const data=fs.readFileSync('data.json','utf8')
// console.log(data)
const users=JSON.parse(data)

let userCnt = users.length; //To count the number of users

//" make the server function and export";

  //Handling the home route, send an h1 tag
const app=http.createServer((req,res)=>{
     if(req.url==="/"){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>HOME PAGE</h1>");
    res.end();
     }
     else if(req.url==="/count"){
      fs.appendFile('logs.txt',"",(err)=>{
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(err.message);
        }
        else {
          const countText = `The inital user count is ${userCnt} at ${new Date().toString()}`;
          const data=`${countText}\n`;
          fs.writeFileSync('logs.txt', data)
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('The user count has been updated in the logs file');
        }

      })
     }
     else if(req.url==="/update"){
      
       const id=userCnt+Math.floor(Math.random()*100)
       const name=os.userInfo().username
       const user={
        id,first_name:name,last_name:name,email:'bahubali@gmail.com',gender:'male'
       }
       fs.writeFile('data.json',"",(err)=>{
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end(err.message);
        }
        else{
          users.push(user)
        
          fs.writeFileSync('data.json',JSON.stringify(users, null, 2))
          const countText = `Updated user count after adding a new user is ${
            userCnt + 1 
          } at ${new Date().toString()}`
          const data=`${countText}\n`;
          fs.appendFileSync('logs.txt', data)
          res.end('The data has been updated, go and check the data file');
        }

       })

     }
      else if(req.url==="/users"){
       const ans=users.map(user=>user.first_name)
       const namearr= ans.map((el)=>`<li>${el}</li>`)
       const response=namearr.join("")
      //  console.log(response)
       res.writeHead(200, { 'Content-Type': 'text/html' });
       res.end(`Following are the users present in database:${response}`)
      }
      else if(req.url==="/address"){
        dns.lookup('masaischool.com', (err, address, family) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(err.message);
          } else {
            const addressMessgae = `URL: masaischool.com IP Address: ${address} and Family is ${family}`;
            const data=`${addressMessgae}\n`
            fs.appendFileSync('logs.txt',data)
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Logs File has been updated")
      }
    
  })
}
   else if(req.url==="/say"){
     fs.readFile('logs.txt','utf8',(err,data)=>{
      if (err) {
        res.write('Error reading logs file.');
        res.end();
      }
      else{
    
        if(!data || data.length==0){
          res.end(cowsay.say({text:''}))
          return
        }
       
         data=data.split("\n")
        //  console.log(data)
        // const cowmessgae= data?data[data.length-1].trim():''
        
        const cowdata = cowsay.say({text: data[data.length-1]});
        // console.log(cowdata)
        // console.log(data[data.length-1],data.length)
        res.end(cowdata)

      }
     })
   }
})
 
  //counting the number of users and writing the initial number in the logs.txt along with the time stamp
 
    
  
  //updating the user database
 
    //should append updated number of users in logs.txt along with the time stamp

  //get the first names of all the users from the json file and send as a response in list format

  //to get the website url from terminal and write its ip address and family in logs.txt
 
  // using the cowsay external module
  



// Do not listen to the server just export(default) it
// server.listen(8080)

// app.listen(8080)
module.exports=app