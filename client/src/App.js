import { Route, Routes } from "react-router-dom"
import Welcome from "./static/Welcome"
import Register from "./auth/authentication/Register"
import Login from "./auth/authentication/Login"
import Home from "./transactions/Home"
import Visualization from "./graphs/Visualization"

function App() {
  return (
    <div className="App">
      <h1>Purse</h1>

      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/visualization" element={<Visualization />} />
        {/* TODO: signout route */}
      </Routes>
    </div>
  );
}

export default App;
