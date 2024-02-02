import "./App.css";
import Watertank from "./Watertank";
import ContextProvider from "./store";

function App() {
  return (
    <ContextProvider>
      <h1 className="app_heading">Water bucket challenge</h1>
      <Watertank />
    </ContextProvider>
  );
}

export default App;
