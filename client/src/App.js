import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Searchbar from "./components/SearchBar/SearchBar";
import JobPage from "./pages/JobPage";
import NotFoundPage from "./pages/NotFoundPage"; // Make sure to adjust the path if needed
import HomePage from "./pages/HomePage";
import "./App.css";
import Footer from "./components/common/Footer";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Searchbar />
          <Routes>
            <Route path="/:job" element={<JobPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />{" "}
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
