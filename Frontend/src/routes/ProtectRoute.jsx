import {Navigate,Outlet,} from "react-router-dom";
import useAuth from "../hooks/useAuth";


const ProtectedRoute = () => {
  const {user,loading,} = useAuth();

  if (loading) {

    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-background
        "
      >
        <div
          className="
            h-6
            w-6
            animate-spin
            rounded-full
            border-2
            border-border
            border-t-brand-400
          "
        />
      </div>
    );
  }


  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  return <Outlet />;
};


export default ProtectedRoute;