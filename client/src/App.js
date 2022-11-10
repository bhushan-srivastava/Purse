import MainRouter from "./MainRouter"
import { message } from "antd"

function App() {
  message.config({ duration: 5 })

  return (
    <div className="App">
      <MainRouter />
    </div>
  );
}

export default App;
