import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import './index.css'
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Profile } from "./pages/ProfilePage/Profile.jsx";
import Resources from "./pages/ResourcePage/Resources.jsx"; 
import { Homepage } from "./pages/homepage/homepage.jsx";
import { Bookings } from './pages/bookingspage/bookings.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/loginpage" element={<Login />} />
        <Route path="/signuppage" element={<Signup />} />
        <Route path= '/homepage' element={<Homepage />} />
        <Route path= '/profilepage' element={<Profile />} />
        <Route path = '/bookingspage' element = {<Bookings />} />
        <Route path = '/resourcespage' element = {<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}