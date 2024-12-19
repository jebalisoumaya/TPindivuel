import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Acceuil from "./Components/Acceuil/Acceuil";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/acceuil" element={<Acceuil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
