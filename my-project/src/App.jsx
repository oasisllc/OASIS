
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import './index.css'
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
          <Route path="/loginpage" element={<Login />} />
          <Route path="/signuppage" element={<Signup />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);  // Ensure createRoot() is called only once
// root.render(<App />);