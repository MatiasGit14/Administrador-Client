import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTareas = () => {
  //Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //Obtener el State de tareas y el context de las tareas
  const tareasContext = useContext(tareaContext);
  const {
    errorTarea,
    tareaSeleccionada,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  //State del form
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });
  //Extraigo el valor del state
  const { nombre } = tarea;

  //Si no hay proyectos no muestro tareas
  if (!proyecto) return null;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Leo los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };
  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Revisar si es edicion o una nueva tarea
    if (tareaSeleccionada === null) {
      //Agragar nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      //Actualizar tarea existente
      actualizarTarea(tarea);
      //Limpiar tarea seleccionada
      limpiarTarea();
    }

    //Obtener y filtrar las tareas, uso la funcion del state que obtiene las tareas y las filtra
    obtenerTareas(proyectoActual._id);

    //Reiniciar el form
    guardarTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          ></input>
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">EL nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTareas;
