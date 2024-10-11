import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"

export default function Home(){
    const {user}=useAuthContext()
    const navigate=useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login")
        } 
    }, []);

    return(
        <div>
            
        </div>
    )


}