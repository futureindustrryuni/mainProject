import { useContext } from "react";
import { IsLoginContext } from "../context/IsLoginContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute({children}) {
  const [isLogin] = useContext(IsLoginContext);
  console.log(isLogin)
  return (
    <>
      {isLogin ? children : <Navigate to='/auth' />}
    </>
  );
}
