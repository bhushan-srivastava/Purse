import { BrowserRouter, Route, Routes } from "react-router-dom"
import Welcome from "./static/Welcome"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ResetPassword from "./auth/ResetPassword"
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./Home"
// import Visualization from "./graphs/Visualization"
import ErrorPage from "./ErrorPage"

const MainRouter = () => {
    const privateRoutes = [
        {
            path: "/",
            redirectTo: "/welcome",
            privateComponent: () => { return <Home /> }
        }
    ]

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<ResetPassword />} />
                {
                    privateRoutes.map((ele, index) => {
                        return (
                            <Route
                                key={index}
                                path={ele.path}
                                element={
                                    <PrivateRoute redirectTo={ele.redirectTo}>
                                        {ele.privateComponent()}
                                    </PrivateRoute>
                                }
                            />
                        )
                    })
                }
                <Route path="*" element={
                    <ErrorPage
                        statusCode="404"
                        errorTitle="404"
                        subTitle="Sorry, the page you visited does not exist."
                    />
                }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;