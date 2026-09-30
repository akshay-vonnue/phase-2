import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../utils/AuthContext";
import { useJwt } from "../hooks/useJwt";

function ProtectedRoute() {
  console.log("inside protected Route");
  const user = useAuthContext();
  console.log(user);
  const { istokenExpired } = useJwt();

  console.log(istokenExpired);
  console.log(!user || istokenExpired);

  if (!user || istokenExpired) {
    return <Navigate to={"/login"} replace/>;
  }

  return <Outlet />;
}

export default ProtectedRoute;
