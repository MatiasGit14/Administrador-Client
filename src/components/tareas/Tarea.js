import React, { useContext } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({ tarea }) => {
  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    cambiarEstadoTarea,
    guardarTareaActual,
  } = tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  //Extraigo el proyecto
  const [proyectoActual] = proyecto;

  //Funcion q se ejecuta cuando se apreta elimnar
  const tareaEliminar = (id) => {
    eliminarTarea(id);
    obtenerTareas(proyectoActual.id);
  };

  //Funcion para modificar el estado
  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    cambiarEstadoTarea(tarea);
  };

  //Agreagar una tarea Actual cuando el usuario desea editarla
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button
            onClick={() => cambiarEstado(tarea)}
            type="button"
            className="completo"
          >
            Completo
          </button>
        ) : (
          <button
            onClick={() => cambiarEstado(tarea)}
            type="button"
            className="incompleto"
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          onClick={() => seleccionarTarea(tarea)}
          type="button"
          className="btn btn-primario"
        >
          Editar
        </button>
        <button
          onClick={() => tareaEliminar(tarea.id)}
          type="button"
          className="btn btn-secundario"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
