import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizPage from "./QuizPage";
import PressPage from "./pages/PressPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/press" element={<PressPage />} />
      </Routes>
    </BrowserRouter>
  );
}