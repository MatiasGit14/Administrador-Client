import React, { useReducer } from "react";
//Importo el context para tener todas las props
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTOS,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../../types";
import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
  //State para mostrar el formulario de nuevo proyecto o no y todo lo que sea STATE del proyecto GENERAL se centraliza aca
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
  };

  //Dispacth para generar las acciones (es similar a como se usa el useState, retorna el state y la funcion)
  const [state, dispacth] = useReducer(proyectoReducer, initialState);

  //Serie de funciones para el CRUD
  //Mostrar el formulario de agregar nuevo proyecto
  const mostrarFormulario = () => {
    dispacth({
      type: FORMULARIO_PROYECTO,
    });
  };
  //Obtener los proyectos, lo que paso como parametro va a ser el PAYLOAD
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");
      dispacth({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispacth({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  //Agregar nuevo proyecto
  const agregarProyecto = async (proyecto) => {
    //agrego el proyecto con el dispatch al STATE,
    //el payload es lo que depende para actualizarlo y el tipo el que definimos en los types
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      //Inserto el proyecto en el state
      dispacth({
        type: AGREGAR_PROYECTOS,
        payload: resultado.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispacth({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  //Validar el formulario por errores
  const mostrarError = () => {
    dispacth({
      type: VALIDAR_FORMULARIO,
    });
  };

  //Seleccionar el proyecto que el usuario de click
  const proyectoActual = (proyectoId) => {
    dispacth({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispacth({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };
      dispacth({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };
  //Creo el Provider para pasar los datos desde aca
  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
