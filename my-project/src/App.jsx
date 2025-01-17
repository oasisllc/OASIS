
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/LandingPage/Hero";
import './index.css'
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";


export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const handleMouseMove = (event) => {
    const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
    const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x: normalizedX, y: normalizedY });
  };




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />}/>
          <Route path="/loginpage" element={<Login />} />
          <Route path="/signuppage" element={<Login />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

// const rootElement = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElement);  // Ensure createRoot() is called only once
// root.render(<App />);