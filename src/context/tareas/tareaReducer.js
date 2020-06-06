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

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO: {
      return {
        ...state,
        tareasProyecto: state.tareas.filter(
          (tarea) => tarea.proyectoId === action.payload
        ),
      };
    }
    case AGREGAR_TAREA:
      return {
        ...state,
        tareas: [action.payload, ...state.tareas],
        errorTarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errorTarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };
    case ACTUALIZAR_TAREA: // Como el codigo es el mismo puedo usar los dos casos aca
    case ESTADO_TAREA: // Si al iterar por las tareas coincide el id pasa por la funcion que cambia el estado de la misma y devuelve la tarea con el estado del payload, si no coincide con el id elegido devuelve las tareas tal cual estaban
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? action.payload : tarea
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaSeleccionada: action.payload,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaSeleccionada: null,
      };
    default:
      return state;
  }
};
