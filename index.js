import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"28Extencion..",
    database:"test"
});

app.use(express.json()); //Para poder usar el body en el request de postman
app.use(cors()) //Para conseguir el consumo del api

app.get("/", (req, res) => {
    res.json("Holo, este es parte del backend: Method get /")
});

app.get("/users", (req, res) => {
    const q = "SELECT A.iduser, A.Nombre, A.email, A.status, b.photo FROM TEST.USERS A LEFT JOIN TEST.PHOTO_TEST B ON A.NOMBRE = B.NAME";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.post("/users", (req, res) => {
    const q = "INSERT INTO TEST.USERS (`Nombre`, `pwd`, `email`, `status`, `imagen`) VALUES (?)"
    /*const values = [
        "Titulo desde backend",
        "Descripcion desde backend",
        "Imagen desde backend"
    ];*/

    const values = [
        req.body.Nombre,
        req.body.pwd,
        req.body.email,
        req.body.status,
        req.body.imagen,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json("Usuario cargado exitosamente");
      });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM TEST.USERS WHERE iduser = ?"

  db.query(q, [userId], (err,data) => {
    if (err) return res.send(err);
    return res.json("Usuario eliminado exitosamente");
  })
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "SELECT * FROM TEST.USERS WHERE iduser = ?"

  db.query(q, [userId], (err,data) => {
    if (err) return res.send(err);
    return res.json(data);
  })
});

app.put("/users/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE TEST.USERS SET `Nombre`= ?, `pwd`= ?, `imagen`= ? WHERE iduser = ?";

  const values = [
    req.body.Nombre,
    req.body.pwd,
    req.body.imagen,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
    console.log("Connected to backend");
});