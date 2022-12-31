const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const productSchema=new mongoose.Schema(
    {
        nombre:{type:String},
        precio:{type:Number},
        

    },{
        timestamp:true,
        versionKey:false
    }
);
let Dataset=mongoose.models.pagos || mongoose.model('pagos',productSchema);
export default Dataset;
//