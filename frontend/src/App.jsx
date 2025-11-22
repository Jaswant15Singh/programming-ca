import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin-login" element={<>Admin login</>} />
        <Route exact path="/resident-login" element={<>Resident login</>} />
        <Route exact path="/admin/dashboard" element={<>Admin Dashboard</>} />
        <Route
          exact
          path="/resident/dashboard"
          element={<>Resident Dashboard</>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
