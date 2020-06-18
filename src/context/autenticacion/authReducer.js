import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    //REGISTRO Y LOGIN EXITOSO COMPARTEN LOGICA
    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };

    //REGISTRO Y LOGIN ERROR COMPARTEN LOGICA
    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        autenticado: null,
        usuario: null,
        cargando: false,
        mensaje: action.payload,
      };

    //UsuarioAutenticado()
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
      };

    default:
      return state;
  }
};
