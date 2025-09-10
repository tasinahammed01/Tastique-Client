import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />; // not logged in
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" />; // not allowed role

  return children;
};

export default ProtectedRoute;
