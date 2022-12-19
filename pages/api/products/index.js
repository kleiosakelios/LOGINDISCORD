import connectDB from "../lib/connectDB";
import Products from '../../models/productModel'
connectDB();

export default async function handler(req,res){
    console.log('hola productos');
    const {method,body}=req;
    switch(method){
        case "GET":
            try{
                const products=await Products.find();
                res.status(200).json(products);

            }catch(error){
                return res.status(500).json({error:error.message});
            }
        case "POST":
            try{
                const newProduct=new Products(body);
                const savedProduct=await newProduct.save();
                return res.status(201).json(savedProduct);
            }catch(error){
                return res.status(500).json({error:error.message});

            }
        default:
            return res.status(400).json({message:"este metodo no se puede soportar ku"})
    }
}
