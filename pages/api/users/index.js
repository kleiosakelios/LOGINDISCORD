import connectDB from "../lib/connectDB";
import Users from '../../models/userModel'
connectDB();

export default async function handler(req,res){
    console.log('hola');
    const {method,body}=req;
    switch(method){
        case "GET":
            try{
                const users=await Users.find();
                res.status(200).json(users);

        }catch(error){
                return res.status(500).json({error:error.message});
        }
        case "POST":
            try{
                const newUser=new Users(body);
                const savedUser=await newUser.save();
                return res.status(201).json(savedUser);
            }catch(error){
                return res.status(500).json({error:error.message});

            }
        default:
            return res.status(400).json({message:"este metodo no se puede soportar ku"})
    }
}
