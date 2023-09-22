import Register from "../src/pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
