import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../redux/app/store";

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.uid) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
