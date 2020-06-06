import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import { v4 as uuidv4 } from "uuid";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareas: [
      { id: 1, nombre: "Elegir colores", estado: false, proyectoId: 2 },
      { id: 2, nombre: "Elegir hosting", estado: false, proyectoId: 3 },
      { id: 3, nombre: "Elegir plataforma", estado: true, proyectoId: 1 },
      {
        id: 4,
        nombre: "Elegir plataforma de pago",
        estado: true,
        proyectoId: 4,
      },
      { id: 5, nombre: "Elegir plataforma", estado: true, proyectoId: 1 },
      { id: 6, nombre: "Elegir colores", estado: false, proyectoId: 2 },
      { id: 7, nombre: "Elegir hosting", estado: false, proyectoId: 3 },
      { id: 8, nombre: "Elegir plataforma", estado: true, proyectoId: 4 },
      { id: 9, nombre: "Elegir colores", estado: false, proyectoId: 1 },
      { id: 10, nombre: "Elegir hosting", estado: false, proyectoId: 2 },
      { id: 11, nombre: "Elegir plataforma", estado: true, proyectoId: 3 },
      { id: 12, nombre: "Elegir colores", estado: false, proyectoId: 4 },
      { id: 13, nombre: "Elegir hosting", estado: false, proyectoId: 3 },
    ],
    tareasProyecto: null,
    errorTarea: false,
    tareaSeleccionada: null,
  };

  //Crear state y dispatch

  //Dispacth para generar las acciones (es similar a como se usa el useState, retorna el state y la funcion)
  const [state, dispacth] = useReducer(tareaReducer, initialState);

  //Crear las funciones
  //Obtener las tareas
  const obtenerTareas = (proyectoId) => {
    dispacth({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };
  // AGREGAR UNA TAREA AL PROYECTO SELECCIONADO
  const agregarTarea = (tarea) => {
    tarea.id = uuidv4();
    dispacth({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };
  //Validar tarea y mostrar error
  const validarTarea = () => {
    dispacth({
      type: VALIDAR_TAREA,
    });
  };
  //Eliminar tarea
  const eliminarTarea = (id) => {
    dispacth({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };
  //Cambia el estado de cada tarea
  const cambiarEstadoTarea = (tarea) => {
    dispacth({
      type: ESTADO_TAREA,
      payload: tarea,
    });
  };
  //Obtengo la tarea actual para editarla
  const guardarTareaActual = (tarea) => {
    dispacth({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //Edita o modifica una tarea
  const actualizarTarea = (tarea) => {
    dispacth({
      type: ACTUALIZAR_TAREA,
      payload: tarea,
    });
  };

  //Elimina la tarea seleccionada para no producir errores
  const limpiarTarea = () => {
    dispacth({
      type: LIMPIAR_TAREA,
    });
  };
  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
};

export default TareaState;
