import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

//Creo un higher order component, indico que este componente va a tener otro dentro para protegerlo
//Lo protejo por ejemplo si no esta autenticado el usuario lo redirije al inicio, si esta autenticado habilita
//el componente interno /Proyectos, de esta manera escribiendo en la URL /Proyectos no se va a poder acceder sin estar autenticado
//(component: Component)
const RutaPrivada = ({ component: Component, ...props }) => {
  console.log(props);

  //Extraer la informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { autenticado, cargando, usuarioAutenticado } = authContext;

  //autentico el usuario cuando se recarga la pagina si ya estaba logueado para que no se desloguee
  //Agregue el state de cargando para ponerle un booleano que ante cualquier opcion cambie a false y así
  //evitar que se vea la pagina de inicio un milisegundo cuando se recarga el componente de proyectos estando autenticado
  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
