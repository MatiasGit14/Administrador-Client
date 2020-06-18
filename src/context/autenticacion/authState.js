import React, { useReducer } from "react";
import authReducer from "./authReducer";
import authContext from "./authContext";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/index";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  //Funciones
  //Registrar un usuario, lo ingresa a la base de datos
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      //Obtener un usuario una vez que se registro exitosamente
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  //Retorna el usuario autenticado cuando se registra, se le otorga un usuario con un token de sesion
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Funcion para enviar el token por headers al back end
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");
      //console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  //Cuando el usuario inicia sesion, que tome sus datos y proyectos
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      //Obtener un usuario una vez que se logueo exitosamente
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  //Cerrar la sesion del usuario
  const cerrarSesion = () =>
    dispatch({
      type: CERRAR_SESION,
    });

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
