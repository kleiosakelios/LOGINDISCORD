import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {  Elements, CardElement,  useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import "bootswatch/dist/lux/bootstrap.min.css"


const CheckoutForm =() =>{

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) =>{
        e.preventDefault(); 

   const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
        if (!error){
            const {id} = paymentMethod;

    
    const {data}= await axios.post('http://localhost:3000/api/compra', {
                id,
                precio: 1000 ,
                cantidad :0,


            })
            console.log(data);
        }
    };

    return <form onSubmit={handleSubmit} className="card card-body  w-96 ">
        <CardElement></CardElement>
        <button className={'w-full text-xl text-white px-5 py-2 rounded-2xl bg-blue-800 hover:bg-purple-900'}onClick={()=>{alert('Compra realizada con exito')}}>
            Comprar
        </button>
    </form>
}

const stripePromise = loadStripe("pk_test_51MJweTCs66fCZYrccb0Xvw2iEWBppgwNCAbRTrrJGDbh8m6ET0PXTo9ZV6mygveAcUf31NHqIyMMQCryC8JPQEFi00B5npy8PT")
function App1(){
    return(
        <Elements stripe={stripePromise}>
         <CheckoutForm/> 
        </Elements>
    );
    
}
export default App1;



