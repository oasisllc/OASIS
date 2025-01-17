
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/LandingPage/Hero";
import './index.css'
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero/>}/>
          <Route path="/loginpage" element={<Login />} />
          <Route path="/signuppage" element={<Signup />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);  // Ensure createRoot() is called only once
// root.render(<App />);