import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {

    const [users, setUsers] = useState ([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try{
                const res = await axios.get("http://localhost:8800/users");
                setUsers(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllUsers();
    }, []);

    console.log(users);

    const handleDelete = async (id) => {
      try {
        await axios.delete("http://localhost:8800/users/"+id);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

    return (
        <div>
            <h1>Usuarios</h1>
            <div className="users">
                {users.map(user => (
                    <div className="user" key={user.iduser}>
                        {user.imagen && <img src={user.imagen} alt="" />}
                        <h2>{user.Nombre}</h2>
                        <p>{user.email}</p>
                        <span>{user.status?"Online" : "Offline"}</span>
                        <button className="delete" onClick={ () => handleDelete(user.iduser)}>Eliminar</button>
                        <button className="update"><Link to={`/update/${user.iduser}`}>Actualizar</Link></button>
                    </div>
                ))}
            </div>
            <button><Link to="/add">Agregar Usuario</Link></button>
        </div>
    );
}

export default Users;