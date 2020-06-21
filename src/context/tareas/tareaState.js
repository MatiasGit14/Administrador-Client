import React, { useReducer } from "react";
import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null,
  };

  //Crear state y dispatch

  //Dispacth para generar las acciones (es similar a como se usa el useState, retorna el state y la funcion)
  const [state, dispacth] = useReducer(tareaReducer, initialState);

  //Crear las funciones
  //Obtener las tareas
  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get(`/api/tareas`, {
        params: { proyecto },
      });
      dispacth({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // AGREGAR UNA TAREA AL PROYECTO SELECCIONADO
  const agregarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.post(`/api/tareas`, tarea);
      dispacth({
        type: AGREGAR_TAREA,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Validar tarea y mostrar error
  const validarTarea = () => {
    dispacth({
      type: VALIDAR_TAREA,
    });
  };
  //Eliminar tarea
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispacth({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Obtengo la tarea actual para editarla
  const guardarTareaActual = (tarea) => {
    dispacth({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //Edita o modifica una tarea
  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispacth({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
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
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
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
