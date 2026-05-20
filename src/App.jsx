import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import HallPage from "./pages/Hall/HallPage.jsx";
import StudyPage from "./pages/Study/StudyPage.jsx";
// import ButlerStudyPage from "./pages/Butler/ButlerStudyPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/hall" element={<HallPage />} />
      <Route path="/study" element={<StudyPage />} />
      {/* <Route path="/study/butler" element={<ButlerStudyPage />} /> */}
    </Routes>
  );
}

export default App;
