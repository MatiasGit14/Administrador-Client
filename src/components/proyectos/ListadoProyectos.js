import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {
  //Extraer los proyectos del state inicial de ProyectoState
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  //Que se ejecute una sola vez obtener los proyectos en el primer render
  useEffect(() => {
    obtenerProyectos();
    // eslint-disable-next-line
  }, []);
  // valido si hay proyecto
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto.id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
