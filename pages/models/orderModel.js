const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const OrderSchema = new Schema({
    products: Object,
    name: String,
    email: String,
    address: String,
    city: String,
    paid: {type:Number,defaultValue:0},
}, {timestamps: true});

let Dataset=mongoose.models.products || mongoose.model('products',OrderSchema);
export default Dataset;