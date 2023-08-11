import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Update = () => {
    
    const [user, setUsers] = useState ({
        Nombre:"",
        pwd:"",
        imagen:"",
    });

    const [error,setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const userId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setUsers((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8800/users/${userId}`, user);
            navigate("/");
        }catch(err){
            console.log(err);
            setError(true);
        }
    };

    console.log(user);

    return (
        <div className="form">
            <h1>Actulizacion de Usuario</h1>
            <input type="text" placeholder="Nombre"  onChange={handleChange} name="Nombre"/>
            <input type="password" placeholder="pwd" onChange={handleChange} name="pwd"/>
            <input type="text" placeholder="imagen"  onChange={handleChange} name="imagen"/>
            <button claseName="formButton" onClick={handleClick}>Actualizar</button>{error && "Something went wrong!"}
      <Link to="/">Todos los Usuarios</Link>
        </div>
    )
};

export default Update;