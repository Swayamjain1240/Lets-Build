import {Routes, Route} from "react-router-dom"

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
        </Routes>
    )
}