import { Routes, Route, } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import HallPage from "./pages/Hall/HallPage.jsx";
import StudyPage from "./pages/Study/StudyPage.jsx";
import Navbar from "./Navbar.jsx";
import ButlerStudyPage from "./pages/Butler/ButlerStudyPage.jsx";
import FullscreenButton from "./Components/FullscreenButton/FullscreenButton.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
<> 
  <Navbar />
  <FullscreenButton />
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/hall" element={
        <ProtectedRoute>
          <HallPage />
        </ProtectedRoute>
      } />
      <Route path="/study" element={ 
        <ProtectedRoute>
          <StudyPage />
        </ProtectedRoute>} />
      <Route path="/study/butler" element={
        <ProtectedRoute>
          <ButlerStudyPage />
        </ProtectedRoute>
      } />
    </Routes>
    
   </> 
  );
}

export default App;
