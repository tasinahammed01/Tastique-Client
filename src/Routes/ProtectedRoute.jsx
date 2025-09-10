
import { Navigate } from "react-router-dom";
import { useAuth } from "../Provider/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // not logged in
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" />; // not allowed role

  return children;
};

export default ProtectedRoute;
