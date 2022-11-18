import {useRouter} from 'next/router';
import {useSession} from "next-auth/react";
import Navbar from "../components/navbar";


export default function Index({user=[]}){
    const {data:session,status}=useSession();



    const router=useRouter();
    return(
        <div className="bg-gray-10 h-screen">
            <Navbar/>
            <div className={'grid my-10 mx-64 p-10 bg-gray-200 rounded-3xl shadow-inherity  '}>
                {user.map(usr=>(
                    <div className={'grid'} key={usr._id}>
                        <div>
                            <label className={'flex justify-center '}>
                                <h1 className={'text-xl mr-10'}>
                                    Nombre:
                                </h1>
                                <input readOnly placeholder={usr.nombres} name='nombres' className={'my-2 rounded-2xl bg-white '} >

                                </input>
                            </label>
                            <label className={'flex justify-center '}>
                                <h1 className={'text-xl mr-10'}>
                                    Apellidos:
                                </h1>
                                <input readOnly placeholder={usr.apellidos} name='apellidos'className={'my-2 rounded-2xl'}>

                                </input>
                            </label>
                            <label className={'flex justify-center '}>
                                <h1 className={'text-xl mr-10'}>
                                    Imagen:
                                </h1>
                                <img   name='imagen'  className={'my-2 rounded-2xl'}
                                src={usr.image}>

                                </img>
                            </label>
                            <label className={'flex justify-center '}>
                                <h1 className={'text-xl mr-10'}>
                                    Telefono:
                                </h1>
                                <input readOnly name='telefono' type={'number'} placeholder={usr.telefono} className={'my-2 rounded-2xl'}>

                                </input>
                            </label>
                            <label className={'flex justify-center '}>
                                <h1 className={'text-xl mr-10'}>
                                    Email:
                                </h1>
                                <input readOnly name='email' type={'email'} placeholder={usr.email} className={'my-2 rounded-2xl'}>

                                </input>
                            </label>
                            <label className={'flex justify-center '}>
                                <h1 className={'text-xl mr-10'}>
                                    Direccion:
                                </h1>
                                <input readOnly name='direccion' placeholder={usr.direccion} className={'my-2 rounded-2xl'}>

                                </input>
                            </label>
                            <label className={'flex justify-center '}>
                                <h1 className={'text-xl mr-10'}>
                                    Fecha:
                                </h1>
                                <input readOnly name='fecha'  placeholder={usr.fecha} className={'my-2 rounded-2xl'}>

                                </input>
                            </label>
                            <label className={'flex justify-center '}>
                                <h1 className={'text-xl mr-10'}>
                                    Genero:
                                </h1>
                                <input readOnly name='genero' placeholder={usr.genero} className={'my-2 rounded-2xl'}>

                                </input>
                            </label>
                            <button className={'w-full text-xl text-white px-5 py-2 rounded-2xl bg-blue-800'} onClick={()=>{router.push(`/user/${usr._id}/edit`)}}>Editar datos</button>

                        </div>


                    </div>
                ))}

            </div>


        </div>



    )
}
export async function getServerSideProps(){


    const res=await fetch(`http://localhost:3000/api/users`);
    const user=await res.json();
    return{
        props:{
            user
        }
    }
}


