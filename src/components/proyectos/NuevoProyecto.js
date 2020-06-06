import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //Obtener el State del formulario, Consumo el context y extraigo las props que necesito
  //Formulario y mostrarFormulario vieneb de ProyectoState y proyectoReducer se encarga de cambiar el estado
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario, //state de formulario en proyecto state
    errorformulario, //state de error en proyecto state
    mostrarFormulario, // funcion para mostrar el formulario de crear nuevo proyecto
    agregarProyecto, // funcion para agregar nuevos proyectos
    mostrarError, // funcion que muestra el error de mandar un formulario vacio
  } = proyectosContext;
  //state del proyecto
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });

  //Extraer nombre del state para pasarlo como value y poder tomarlo del input
  const { nombre } = proyecto;

  //Lee los contenidos del input y los guardar en el STATE
  const onChangeProyecto = (e) => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando el usuario envia el proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();
    // Validar el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }
    // Guardar en el state del objeto proyecto ahora con el ID que trae del context
    agregarProyecto(proyecto);
    //Reiniciar el Form porque el parametro value del input es el {name} del objeto
    guardarProyecto({
      name: "",
    });
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primario btn-block"
        onClick={() => mostrarFormulario()}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? (
        <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
