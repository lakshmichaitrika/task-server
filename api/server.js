const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const db=require("./dbConfig");
const server=express();



server.use(cors());
server.use(helmet())
server.use(express.json());




server.get('/tasks',async(req,res)=>{
    //get all todos
    try {
        const tasks = await db('tasks');
        res.status(200).json(tasks);
    } catch(err) {
        console.log(err,"hello");
    }

})

server.get('/tasks/:id',async(req,res)=>{
    //get all todos
    const {id}=req.params
    
    try{
        const currentTask=await db('tasks').where({id})
   currentTask.length===0 ?res.status(400).json({message:"Task not found"}):res.status(200).json(currentTask)

    }
    catch(err){
        console.log(err)
    }
    const tasks=db("tasks")

})

server.post('/tasks',async(req,res)=>{
    const {title,description}=req.body
    console.log(req.body)
    if (!title){
      return res.status(400).json({message:"no data found."})
    }
    try{
        await db('tasks').insert({title:title,description:description})
        res.status(202).json({message:'Task successfully stored!'})
    }
    catch(err){
        console.log(err)
    }

})

server.put('/tasks/:id',async(req,res)=>{
    const {id}=req.params
    const {title,description}=req.body
    if (!title){
        return res.status(400).json({message:"no data found."})
      }
 try{ 
const currentTask=await db('tasks').where({id}).update({title,description})
res.status(200).json({message:'Task updated successfully'})
 }
 catch(err){
    console.log(err)
 }

})

server.delete('/tasks/:id',async(req,res)=>{
    const {id}=req.params
    try{ 
await db('tasks').where({id}).del()
res.status(200).json({message:'Task deleted successfully'})
 }
 catch(err){
    console.log(err)
 }

    //delete
})

module.exports=server;