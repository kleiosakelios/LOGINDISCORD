import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const User = ({ user}) => {

    return(
        <h1>{user.email}</h1>
    )
};

export async function getServerSideProps({ query: { id } }) {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);

    if (res.status === 200) {
        const user = await res.json();

        return {
            props: {
                user,
            },
        };
    }


}

export default User;