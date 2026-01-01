import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BatteryForm from "./components/Add Details/BatteryForm";
import SearchBattery from "./components/Search/SearchBattery";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<BatteryForm />} />
          <Route path="/add" element={<BatteryForm />} />
          <Route path="/search" element={<SearchBattery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
