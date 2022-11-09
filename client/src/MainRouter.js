import { BrowserRouter, Route, Routes } from "react-router-dom"
import Welcome from "./static/Welcome"
import Register from "./auth/authentication/Register"
import Login from "./auth/authentication/Login"
import PrivateRoute from "./auth/authorization/PrivateRoute";
import Home from "./transactions/Home"
import Visualization from "./graphs/Visualization"
import Logout from "./auth/authentication/Logout";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/" element={<Home />} /> */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute redirectTo="/login">
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/visualization"
                    element={
                        <PrivateRoute redirectTo="/login">
                            <Visualization />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/logout"
                    element={
                        <PrivateRoute redirectTo="/welcome">
                            <Logout />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;