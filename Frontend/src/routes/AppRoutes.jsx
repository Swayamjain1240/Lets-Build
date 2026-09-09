import {Routes, Route} from "react-router-dom"
import Landing from "../pages/home/Landing.jsx";
import Login from "../pages/auth/Login.jsx"
import Signup from "../pages/auth/Signup.jsx"
import Onboarding from "../pages/onboarding/Onboarding";

const HomePlaceHolder = ()=>{
    return(
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold text-heading">Let's Build</h1>
        </div>
    );
};

const AppRoute = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePlaceHolder />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
        </Routes>
    )
}

export default AppRoute;