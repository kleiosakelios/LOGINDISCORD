import connectDB from "../lib/connectDB";
import Pagos from '../../models/compraModel'
connectDB();

export default async function handler(req,res){
    console.log('hola pagos');
    const {method,body}=req;
    switch(method){
        case "GET":
            try{
                const products=await Pagos.find();
                return res.status(200).json(products);

            }catch(error){
                return res.status(500).json({error:error.message});
            }
        case "POST":
            try{
                const newProduct=new Pagos(body);
                const savedProduct=await newProduct.save();
                return res.status(201).json(savedProduct);
            }catch(error){
                return res.status(500).json({error:error.message});

            }
        default:
            return res.status(400).json({message:"este metodo no se puede soportar "})
    }
}
//