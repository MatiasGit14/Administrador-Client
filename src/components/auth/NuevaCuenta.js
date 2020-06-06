import React, { useState } from "react";
import { Link } from "react-router-dom";

const NuevCuenta = () => {
  //State para el usuario
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  //Extaigo datos para pasar como value
  const { nombre, email, password, confirmar } = usuario;

  //Capturo los datos de los inputs
  const onChange = (e) => {
    guardarUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  //Funcion del submit
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios

    //Password minimo de 6 caracteres

    //Los 2 password son iguales

    //Pasarlo al Action (use Reducer)
  };
  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Obtener un Cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevCuenta;
