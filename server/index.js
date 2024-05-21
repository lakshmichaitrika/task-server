const express=require("express");
const mongoose=require("mongoose");
const TaskSchema=require("./model");
const cors=require("cors")
const dotenv=require("dotenv");
const path=require("path");
__dirname=path.resolve();
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("db connected")
})
.catch(err=>{
    console.log(err)
})
const app=express()
app.use(express.json())
app.use(express.static(path.join(__dirname,'/client/dist')))
app.use(cors({
    origin:"*"
}))



app.listen("5000",()=>{
    console.log("server is running at 5000")
})
app.get("/",(req,res)=>{
    res.json("hello");
})

app.post("/addtask",async(req,res)=>{
    const {todo}=req.body;
    try{
        const newTask=new TaskSchema({todo});
        await newTask.save()
        return res.json(await TaskSchema.find())

    }
    catch(e){
     console.log(e)
    }
})

app.get('/gettask', async (req, res) => {
    try {
      const tasks = await TaskSchema.find();
      console.log('Fetched tasks:', tasks);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.delete("/delete/:id",async(req,res)=>{
        const task=req.params.id;
        await TaskSchema.findByIdAndDelete(task)
        res.json(await TaskSchema.find())
        })