import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import {router} from "next/client";
import App1 from "../../components/pago";
export default function Index() {
  const { data: session, status } = useSession();
  const [product, setProduct] = useState({
    nombre: "",
    imagen: "",
    precio: "",
  });
  const { query, push } = useRouter();
  const getProduct = async () => {
    const res = await fetch("http://localhost:3000/api/products/" + query.id);
    const data = await res.json();
    setProduct({
      nombre: data.nombre,
      imagen: data.imagen,
      precio: data.precio,
    });
  };
  useEffect(() => {
    if (query.id) getProduct();
    console.log(query.id);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={"bg-gray-200 m-32 rounded-2xl p-10 "}>
        <h1 className={"text-6xl "}>{product.nombre}</h1>
        <img src={product.imagen} className={"w-1/4"}></img>
        <div className={'flex justify-between '}>
          <div className={'flex'}>
            <h1 className={'text-4xl'}>{product.precio} </h1>
            <h1 className={'text-4xl ml-2'}>$</h1>
          </div>

          <button className={'mx-10 text-3xl h-16 bg-blue-500 w-32 rounded-2xl hover:bg-green-500'}
          onClick={async()=>{alert("comprado correctamente");await router.push('/')}}
          >Comprar</button>
          
        </div>
      </div>
      <div>{App1()}</div>
    </div>
  );
}

//