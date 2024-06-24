import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};