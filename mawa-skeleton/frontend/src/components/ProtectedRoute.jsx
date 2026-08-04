import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


function ProtectedRoute({ children, role }) {

  const { user, loading } = useAuth();


  // Wait until checking localStorage finishes
  if (loading) {
    return null;
  }


  // User is not logged in
  if (!user) {

    return (
      <Navigate 
        to="/login" 
        replace 
      />
    );

  }


  // User role doesn't match
  if (role && user.role !== role) {


    let fallback;


    if (user.role === "owner") {

      fallback = "/owner/dashboard";

    } else if (user.role === "renter") {

      fallback = "/renter/dashboard";

    } else if (user.role === "admin") {

      fallback = "/admin/dashboard";

    } else {

      fallback = "/";

    }


    return (
      <Navigate 
        to={fallback} 
        replace 
      />
    );

  }


  return children;

}


export default ProtectedRoute;