import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Searchbar from "./components/SearchBar/SearchBar";
import "./App.css";
import JobPage from "./pages/JobPage";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Searchbar />
          <Routes>
            <Route path="/:job" element={<JobPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
