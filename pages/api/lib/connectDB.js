import mongoose from 'mongoose';

export default  function connectDB(){
    if(mongoose.connections[0].readyState){
        console.log('Estas conectado a la base de datos')
        return;
    }
    mongoose.connect(process.env.MONGODB_URI,{},err=>{
        if(err){throw err}
        console.log('Conexion satisfactoria a la base de datos')
    })
}
