import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Landing from "../landing/Landing";
import Register from "../register/Register";
import Login from "../login/Login";
import ForgotPassword from "../forgot-password/ForgotPassword";

const WebRouting = () => {

    return (
        <Routes>
            <Route path="/listing" element={<Home />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*/*" element={<Navigate to={"/"} />} />
        </Routes >
    );
};

export default WebRouting;