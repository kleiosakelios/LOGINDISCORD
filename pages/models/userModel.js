const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new mongoose.Schema(
    {
        nombres:{type:String},
        apellidos:{type:String},
        image:{type:String},
        telefono:{type:Number},
        email:{type:String},
        direccion:{type:String},
        fecha:{type:Date},
        genero:{type:String},

    },{
            timestamp:true,
            versionKey:false
    }
);
let Dataset=mongoose.models.users || mongoose.model('users',userSchema);
export default Dataset;