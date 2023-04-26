import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, login }) => {
  //   const login = true; ver despues hijos y datos de login 

  if (login) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
