const express=require('express')
const fs=require('fs').promises
const app=express()
const port=3080

app.get('/',(req,res)=>{
    try{
           res.status(200).json({msg:"Welcome to Express Server"});
    }catch(e){
        res.status(500).json({msg:"Error:"+e})
    }
})
app.use(express.json()); 
// app.use(express.text());


app.post("/register", async (req, res) => {
    // console.log(req.body);
    let arr=[]
    const { email, password } = req.body;
    console.log(email+password)
    const fdata = await fs.readFile('student.json', { encoding: 'utf-8' }); 
    arr = JSON.parse(fdata); 
    console.log(arr)
    const result = arr.find(ele => ele.email === email);
                if (result) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(500).json(JSON.stringify({ "message": "Email already exists" }));  
                    // return res.end(JSON.stringify({ "message": "Email already exists" }));
                }
                else{
                    arr.push({ email, password });
                   await fs.writeFile('student.json', JSON.stringify(arr, null, 2));

                // res.setHeader('Content-Type', 'application/json');
                res.status(200).json(JSON.stringify({ "message": "User registered successfully!", "status": 200 }));
                }
    // console.log("Email:" + email + " Password:" + password);  
    
});

app.post("/login", (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;  
    console.log("Email:" + email + " Password:" + password);  
    res.status(200).json({ msg: "Hello The /data Api" });  
});


app.delete("/data",(req,res)=>{
   res.status(200).json({msg:"Hit the Delete /data API"})
})

app.listen(port,()=>{
    console.log(`Express server is running on ${port}`)
})