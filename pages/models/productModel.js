const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const productSchema=new mongoose.Schema(
    {
        nombre:{type:String},
        precio:{type:Number},
        imagen:{type:String},
        cantidad:{type:Number,default:0}


    },{
        timestamp:true,
        versionKey:false
    }
);
let Dataset=mongoose.models.products || mongoose.model('products',productSchema);
export default Dataset;