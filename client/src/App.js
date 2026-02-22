import MainRouter from "./MainRouter"
import { message } from "antd"
import { AuthProvider } from "./auth/AuthContext";

function App() {
  message.config({ duration: 5 })

  return (
    <div className="App">
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
