import { SlCalender } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { CiBookmarkCheck } from "react-icons/ci";
import { VscTools } from "react-icons/vsc";
import { FaRegShareSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const NavigationPanel = ({showPanel}) =>{
    const location = useLocation();
    const user = location.state?.user;

    const navigate = useNavigate();

    const navAccount = () => {
        console.log(user)
        navigate('/profilepage', { state: { user: user } });
    }

    const navResources = () =>{
        console.log(user)
        navigate('/resourcespage', { state: { user: user } });

    }

    const navToLink = (link) =>{
        navigate(link, { state: { user: user } });

    }

    return(
        <motion.div
        initial = {{x:-200, opacity:0}} 
        animate = { showPanel? { x:0, opacity: 1} : {x:-200, opacity: 0}}
        transition = {{duration:0.75, ease: "easeIn", type: "spring" }}
        
        className="w-48 z-50 h-screen p-4  fixed">
            <div className= "text-green-500 shadow-2xl  bg-white w-full h-full justify-between p-4 items-center flex flex-col gap-16 " >
               <div className=" mb-8 gap-x-2 text-xl w-full font-bold flex justify-center items-center rounded ">
                    <SlCalender  />
                    <h1 className="text-">Appointly</h1>
                </div>

                <div className=" items-center justify-center flex flex-col gap-4" >
                    <div className="w-full flex justify-center flex-row-reverse items-center gap-x-2 p-2 border-b border-green-400" >
                    <GoHome />
                    <Link to="/homepage" state={{ user }}>  Home </Link>
                    </div>
                    <div className="w-full flex justify-center flex-row-reverse items-center gap-x-2 p-2 border-b border-green-400" >
                        <CiBookmarkCheck  />
                        <Link to="/bookingspage" state={{ user }}>Bookings</Link>
                    </div>
                    <div className="w-full flex justify-center flex-row-reverse items-center gap-x-2 p-2 border-b border-green-400" >
                        <VscTools />
                        <a onClick={navResources}>Resources</a>
                    </div>
                    <div className="w-full flex justify-center flex-row-reverse items-center gap-x-2 p-2 border-b border-green-400" >
                        <FaRegShareSquare  />
                        <a onClick={() => navToLink('/blogpage')} >Blogs</a>
                    </div>
                </div>

                <div className="w-full items-center h-32 justify-center flex flex-col gap-4" >
                    <div className="w-full flex justify-center flex-row-reverse items-center gap-x-2 p-2 border-green-400">
                        <VscAccount />
                        <a onClick={navAccount}>Account</a>
                    </div>
                    <a href="/" className="bg-red-200 p-2 px-4 rounded-lg" ><span> Sign out</span></a>
                </div>
                </div> 
        </motion.div>
    )



}

export default NavigationPanel