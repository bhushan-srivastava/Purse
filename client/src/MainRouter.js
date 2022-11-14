import { BrowserRouter, Route, Routes } from "react-router-dom"
import Welcome from "./static/Welcome"
import Register from "./auth/authentication/Register"
import Login from "./auth/authentication/Login"
import ResetPassword from "./auth/authentication/ResetPassword"
import PrivateRoute from "./auth/authorization/PrivateRoute";
import Home from "./transactions/Home"
// import Visualization from "./graphs/Visualization"
import Logout from "./auth/authentication/Logout";
import ErrorPage from "./ErrorPage"

/* test */
// import DefaultLayout from "./default_layout/DefaultLayout"
// import EditName from "./user/EditName"
import DeleteAccount from "./user/DeleteAccount"

const MainRouter = () => {
    const privateRoutes = [
        {
            path: "/",
            redirectTo: "/welcome",
            privateComponent: () => { return <Home /> }
        },
        {
            path: "/logout",
            redirectTo: "/welcome",
            privateComponent: () => { return <Logout /> }
        }
    ]

    return (
        <BrowserRouter>
            <Routes>
                {/* test route */}
                <Route path="/test" element={
                    // <DefaultLayout >
                    //     t/v, o/v, s/v
                    //     <p>table</p>
                    //     <p>graph</p>
                    // </DefaultLayout>

                    // <EditName />

                    <DeleteAccount />
                }
                />


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