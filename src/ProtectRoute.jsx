import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, loading }) => {
  if (user && loading === false) {
    return <Outlet />;
  }
  if (!user && loading === false) {
    return <Navigate to="/" />; 
  }
};
