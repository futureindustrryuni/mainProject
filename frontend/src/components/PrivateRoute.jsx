import { useContext } from "react";
import { IsLoginContext } from "../context/IsLoginContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute({children}) {
  const navigation = useNavigate();
  const isLogin = useContext(IsLoginContext);
  return (
    <>
      {isLogin ? children : <Navigate to='/auth' />}
    </>
  );
}
