import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/LandingPage/Hero";
import './index.css'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />}>
        
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);