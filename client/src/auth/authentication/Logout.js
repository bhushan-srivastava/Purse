import { Navigate } from "react-router-dom"
import Welcome from "../../static/Welcome";

const Logout = () => {
    // ig remove id from local storage
    return (
        <Navigate to="/welcome" element={<Welcome />} />
    );
}

export default Logout;