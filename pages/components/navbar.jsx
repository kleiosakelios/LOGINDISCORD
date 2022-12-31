import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {

  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div>
      <div name="navbar" className="bg-gray-900 py-3 flex justify-between">
        <div className="grid content-center mx-10">
          <img
            onClick={() => router.push("/")}
            src="https://logos-world.net/wp-content/uploads/2020/12/Discord-Logo.png"
            className="w-10"
          ></img>
        </div>
        <div name="foto usuario" className="w-80 mx-10 flex justify-evenly">
          <button
            onClick={() => router.push("/user")}
            className="bg-blue-500 my-4 mx-2 px-1 rounded-xl hover:bg-blue-700 hover:text-white"
          >
            Editar Perfil
          </button>
          <button
            onClick={() => signOut()}
            className="bg-blue-500 my-4 mx-2 px-1 rounded-xl hover:bg-red-600 hover:text-white"
          >
            Cerrar sesion
          </button>
          <h1 className="grid content-center text-white">
            {session?.user?.name}
          </h1>
          <img src={session?.user?.image} className="w-16"></img>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/users`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}