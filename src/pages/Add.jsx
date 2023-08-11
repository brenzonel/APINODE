import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Img from "../IMG/img.png";

const Add = () => {
    
    const [user, setUsers] = useState ({
        Nombre:"",
        pwd:"",
        email:"",
        status:true,
        imagen:"",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8800/users", user);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };

    console.log(user);

    return (
        <div className="form">
            <h1>Usuario Nuevo</h1>
            <input type="text" placeholder="Nombre"  onChange={handleChange} name="Nombre"/>
            <input type="password" placeholder="pwd" onChange={handleChange} name="pwd"/>
            <input type="text" placeholder="email"  onChange={handleChange} name="email"/>
            <input type="text" placeholder="imagen"  onChange={handleChange} name="imagen"/>
            <button claseName="formButton" onClick={handleClick}>Agregar</button>
        </div>
    )
};

export default Add;