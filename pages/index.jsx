import {useSession} from 'next-auth/react'
import { Router, useRouter } from 'next/router'
import LoginPage from './login'
import { signOut } from 'next-auth/react';
import Navbar from "./components/navbar";

export default function Home({product=[]}) {

  const router=useRouter();
const {data:session,status}=useSession();
if(status==='loading'){
  return <p>Loading....</p>
}
if(status==='unauthenticated'){
  router.push('./login')
}
  return (
      <div className="bg-gray-700 h-screen">
         <Navbar/>
          <div className={'grid my-10 mx-10 justify-center p-10 bg-gray-200 rounded-3xl shadow-inherity flex md:grid md:grid-cols-4 md:gap-4 '}>
              {product.map(prd=>(
                  <div className={''} key={prd._id}>
                      <div>
                          <img src={prd.imagen} className={'h-40'}></img>
                          <h1 className={'text-center text-xl h-16'}>{prd.nombre}</h1>
                          <h1 className={'ml-4'}>{prd.precio} $</h1>
                          <button className={'w-full text-xl text-white px-5 py-2 rounded-2xl bg-blue-800 hover:bg-purple-900'} onClick={()=>{router.push(`/productos/${prd._id}`)}}>Comprar</button>
                          <button className={'w-full text-xl text-white px-5 py-2 rounded-2xl bg-blue-800 hover:bg-purple-900'} onClick={()=>{alert('meriunm funcion si no hace jala curso')}}>Agregar al carrito</button>

                      </div>


                  </div>
              ))}

          </div>


      </div>
  )
}

export async function getServerSideProps(){


    const res=await fetch(`http://localhost:3000/api/products`);
    const product=await res.json();
    return{
        props:{
            product
        }
    }
}
   
  
