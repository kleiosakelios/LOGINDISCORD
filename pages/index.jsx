import {useSession} from 'next-auth/react'
import { Router, useRouter } from 'next/router'
import LoginPage from './login'
import { signOut } from 'next-auth/react';
import React from 'react';
import Navbar from "./components/navbar";
import { useState } from 'react';



export default function Home({product=[]}) {
    

    const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);
    const [active, setActive] = useState(false);

    
	const onDeleteProduct = product => {
		const results = allProducts.filter(
			item => item._id !== product._id
		);

		setTotal(total - product.precio * product.cantidad);
		setCountProducts(countProducts - product.cantidad);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};


    const onAddProduct = product => {
		if (allProducts.find(item => item._id === product._id)) {
			const products = allProducts.map(item =>
				item._id === product._id
					? { ...item, cantidad: item.cantidad + 1 }
					: item
			);
			setTotal(total + product.precio * product.cantidad);
			setCountProducts(countProducts + product.cantidad);
			return setAllProducts([...products]);
		}

		setTotal(total + product.precio * product.cantidad);
		setCountProducts(countProducts + product.cantidad);
		setAllProducts([...allProducts, product]);
	};
    




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




        <header className='bg-sky-200 h-24 mt-3 rounded-lg mb-10'>
			<div className='flex'> 
				<h1 className='logo bg-center bg-cover w-12 h-12 ml-4'></h1> 
				<h1 className='text-4xl ml-5 '>Tienda Virtula Discord</h1>
			</div>

			<div className='container-icon mr-4'>
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>


					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>

				<div
					className={`container-cart-products ${
						active ? '' : 'hidden-cart'
					}`}
				>
					{allProducts.length ? (
						<>
							<div className='row-product'>
								{allProducts.map(product => (
									<div className='cart-product' key={product._id}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{product.cantidad}
											</span>
											<p className='titulo-producto-carrito'>
												{product.nombre}
											</p>
											<span className='precio-producto-carrito'>
												${product.precio}
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(product)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>
		</header>







          <div className={'grid my-10 mx-10 justify-center p-10 bg-gray-200 rounded-3xl shadow-inherity flex md:grid md:grid-cols-4 md:gap-4 '}>
                <div className='container-items ml-36'>{product.map(producto => (
                    <div className='item flex' key={producto._id}>
                        <figure className='w-56'>
                            <img src={producto.imagen} alt={"verano"} />
                        </figure>
                        <div className='info-product w-64'>

                            <h2 className='italic h-28'>Titulo: <br></br>
                                <div className='font-sans font-semibold text-xl'>{producto.nombre}</div>
                            </h2>
                                
                            <div className='flex justify-between'>
                                <div className='text-transparent'>.</div>
                                <p className='price flex'>
                                    <div className='text-xl'>$/</div>
                                    <div className='text-3xl'>{producto.precio}</div>
                                    <div className='text-transparent'>.</div>
                                </p>
                            </div>
                                
                            <button className={'w-full text-xl text-white px-5 py-2 rounded-2xl bg-blue-800 hover:bg-purple-900'} onClick={()=>{router.push(`/productos/${producto._id}`)}}>Detalles</button>
                            <button className={'w-full text-xl text-white px-5 py-2 rounded-2xl bg-blue-800 hover:bg-purple-900'} onClick={() => onAddProduct(producto)}>Agregar al carrito</button>

                        </div>


				    </div>
			    ))}</div>

          </div>
<div>
    
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
   

