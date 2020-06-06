import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
//Importo el context para tener todas las props
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

//importo los types como el archivo se llama index.js no se le pone el nombre del archivo
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTOS,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../../types";

const ProyectoState = (props) => {
  const proyectos = [
    { id: 1, nombre: "Tienda virtual" },
    { id: 2, nombre: "Intranet" },
    { id: 3, nombre: "Diseño de sitios WEB" },
    { id: 4, nombre: "MERN" },
  ];
  //State para mostrar el formulario de nuevo proyecto o no y todo lo que sea STATE del proyecto GENERAL se centraliza aca
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
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
  const obtenerProyectos = () => {
    dispacth({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  };

  //Agregar nuevo proyecto
  const agregarProyecto = (proyecto) => {
    //Primero agrega un id
    proyecto.id = uuidv4();
    //luego agrega el proyecto con el dispatch al STATE,
    //el payload es lo que depende para actualizarlo y el tipo el que definimos en los types
    dispacth({
      type: AGREGAR_PROYECTOS,
      payload: proyecto,
    });
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

  const eliminarProyecto = (proyectoId) => {
    dispacth({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId,
    });
  };
  //Creo el Provider para pasar los datos desde aca
  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
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
