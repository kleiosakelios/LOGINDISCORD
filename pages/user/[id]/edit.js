import {useRouter} from 'next/router';
import {useSession} from "next-auth/react";
import {useState,useEffect} from 'react'

export default function Index(){
    const {data:session,status}=useSession();
    const nombre=session?.user.name

    const router=useRouter()

    const [newUser, setNewUser] = useState({
        nombres:'',
        image:'',
        apellidos:'',
        telefono:'',
        email:'',
        direccion:'',
        fecha:'',
        genero:'',
    });
    const { query, push } = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const getUser = async () => {
        const res = await fetch("http://localhost:3000/api/users/" + query.id);
        const data = await res.json();
        setNewUser({ nombres:data.nombres,apellidos:data.apellidos,telefono:data.telefono,email:data.email,direccion:data.direccion,fecha: data.fecha,genero:data.genero });
    };

    useEffect(() => {

        if (query.id) getUser()
        console.log(query.id)

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errs = validate();




        setIsSubmitting(true);

        if (query.id) {
            await updateUser();
            alert('actualizado')
            console.log('actualizando datos')
        }
        await push("/user");
    };

    const handleChange = (e) =>
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(newUser)

    const validate = () => {
        let errors = {};

        if (!newUser.title) {
            errors.title = "Title is required";
        }
        if (!newUser.description) {
            errors.description = "Description is required";
        }

        return errors;
    };

    const createUser = async () => {
        try {
            await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const updateUser = async () => {
        try {
            await fetch("http://localhost:3000/api/users/" + query.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="bg-gray-10 h-screen">
            <div name ='navbar'className="bg-gray-900 py-3 flex justify-between" >
                <div className="grid content-center mx-10">
                    <img onClick={()=>router.push('/')}
                         src='https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png' className="w-10"></img>
                </div>
                <div name='foto usuario' className="w-80 mx-10 flex justify-evenly">
                    <button onClick={()=>push('/user')}
                            className='bg-blue-500 my-4 px-1 rounded-xl hover:bg-blue-700 hover:text-white'>Editar Perfil</button>
                    <h1 className="grid content-center text-white">{(session?.user?.name)}</h1>
                    <img src={session?.user?.image} className="w-16"></img>



                </div>
            </div>
            <div className={'grid my-10 mx-64 p-10 bg-gray-200 rounded-3xl shadow-inherity  '}>

                <div className={'grid'} >
                    <form onSubmit={handleSubmit}>
                        <label className={'flex justify-center '}>
                            <h1 className={'text-xl mr-10'}>
                                Nombre:
                            </h1>
                            <input  value={newUser.nombres}  name='nombres' className={'my-2 rounded-2xl bg-white '}  onChange={handleChange}>

                            </input>
                        </label>
                        <label className={'flex justify-center '}>
                            <h1 className={'text-xl mr-10'}>
                                Apellidos:
                            </h1>
                            <input  value={newUser.apellidos} name='apellidos'className={'my-2 rounded-2xl'} onChange={handleChange}>

                            </input>
                        </label>
                        <label className={'flex justify-center '}>
                            <h1 className={'text-xl mr-10'}>
                                Imagen:
                            </h1>
                            <img   name='imagen'  className={'my-2 rounded-2xl'}
                                   src={newUser.image}>

                            </img>
                        </label>
                        <label className={'flex justify-center '}>
                            <h1 className={'text-xl mr-10'}>
                                Telefono:
                            </h1>
                            <input  name='telefono' value={newUser.telefono} type={'number'} className={'my-2 rounded-2xl'} onChange={handleChange}>

                            </input>
                        </label>
                        <label className={'flex justify-center '}>
                            <h1 className={'text-xl mr-10'}>
                                Email:
                            </h1>
                            <input  name='email' value={newUser.email} className={'my-2 rounded-2xl'} type={'email'} onChange={handleChange}>

                            </input>
                        </label>
                        <label className={'flex justify-center '}>
                            <h1 className={'text-xl mr-10'}>
                                Direccion:
                            </h1>
                            <input  name='direccion' value={newUser.direccion} className={'my-2 rounded-2xl'}  onChange={handleChange}>

                            </input>
                        </label>
                        <label className={'flex justify-center '}>
                            <h1 className={'text-xl mr-10'}>
                                Fecha:
                            </h1>
                            <input  name='fecha' value={newUser.fecha} className={'my-2 rounded-2xl'} type={'date'} onChange={handleChange}>

                            </input>
                        </label>
                        <label className={'flex justify-center '}>
                            <h1 className={'text-xl mr-10'}>
                                Genero:
                            </h1>
                            <input  name='genero' value={newUser.genero} className={'my-2 rounded-2xl'} onChange={handleChange}>

                            </input>
                        </label>
                        <button type='submit' className={'w-full text-xl text-white px-5 py-2 rounded-2xl bg-blue-800'} >Guardar cambios </button>

                    </form>


                </div>


            </div>


        </div>



    )
}
