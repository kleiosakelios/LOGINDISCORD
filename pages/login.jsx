import { signIn,useSession } from "next-auth/react";
import { useRouter } from "next/router";

function LoginPage(){
    const router=useRouter();
const{data:session,status}=useSession();
if(status!=='loading' && status==='authenticated'){
    router.push('/')
}


    return <>
        <div className="h-screen w-full  bg-gray-900 grid content-center">
            <div className="flex justify-evenly ">
                

                <div className=" grid content-center grid-cols-5 ">
                    <img src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/625eb604bb8605784489d361_Discord-Logo%2BWordmark-Color%20(1).png' 
                    className='w-full col-start-1 col-end-6 '></img>
                    <button  className="text-gray-800 
                    bg-gray-100 mx-10  p-4 rounded-xl flex 
                    justify-evenly hover:bg-green-500 w-full col-start-3 col-end-4 " onClick={()=>signIn('discord')}>
                        <p className="h-full grid content-center mr-2">Login</p>
                         <img 
                            src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-5-1.png"
                             className="w-8  hover:animate-spin "></img>
                    </button>
                </div>
            

            </div>

            
            
        </div>
    </>
}
export default LoginPage;