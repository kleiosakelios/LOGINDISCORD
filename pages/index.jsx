import {useSession} from 'next-auth/react'
import { Router, useRouter } from 'next/router'
import LoginPage from './login'
import { signOut } from 'next-auth/react';

export default function Home() {

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
          <div name ='navbar'className="bg-gray-900 py-3 flex justify-between" >
              <div className="grid content-center mx-10">
                  <img
                      src='https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png' className="w-10" onClick={()=>router.push('/')}></img>
              </div>
              <div name='foto usuario' className="w-80 mx-10 flex justify-evenly">
                  <button onClick={()=>router.push('/user')}
                          className='bg-blue-500 my-4 px-1 rounded-xl hover:bg-blue-700 hover:text-white'>Editar Perfil</button>
                  <h1 className="grid content-center text-white">{(session?.user?.name)}</h1>
                  <img src={session?.user?.image} className="w-16"></img>



              </div>
          </div>


      </div>
  )
}

   
  
