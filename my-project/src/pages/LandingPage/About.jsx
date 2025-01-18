import { motion } from "framer-motion";
import { Canvas } from '@react-three/fiber';
import { Decal, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Float, useTexture } from "@react-three/drei";
import { MeshStandardMaterial } from "three";

const Ball = (props) => {
  const texture = useTexture(props.decal);

  return (
    <Float speed={5} rotationIntensity={1} floatIntensity={4}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial />
        
        <Decal 
          position={[0, 0, 1]} 
          rotation={[0,0,0]}
          scale={1}
        >
          <meshStandardMaterial 
            polygonOffset
            polygonOffsetFactor={-1}
            transparent={false}
            alphaTest={0.5} 
            map={texture}  // Apply the loaded texture here
          />
        </Decal>
      </mesh>
    </Float>
  );
};

const BallCanvas = (props) => {
  return (
    <Canvas style={{ width: '100%', height: '100%' } }>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={60} />
      <OrbitControls enablePan={false} enableZoom={false} />
      <ambientLight intensity={0.3} color='yellow' />
      <directionalLight position={[0, 0, 0.05]} color='yellow' intensity={0.5} />
      <Ball decal = {props.decal} />
    </Canvas>
  );
};

const About = () => {
  return (
    <motion.div id="about" className="relative w-full min-h-screen overflow-hidden bg-neutral-900 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
      {/* Left Section with Motion */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
        className="md:w-1/2 w-full flex items-center justify-center"
      >
        <div
          style={{
            boxShadow: "0px 0px 20px rgba(255, 233, 0, 1)",
            borderRadius: "24px",
          }}
          className="w-full max-w-md md:max-w-lg min-h-[300px] text-center p-4 justify-center items-center"
        >
          <h1 className="text-2xl p-2">What Is <br /> Appointly?</h1>
          <br />
          <p className="text-base text-yellow-100">
            "Appointly is your{" "}
            <motion.span
              className="bg-gradient-to-r font-bold from-yellow-200 to-yellow-300 bg-clip-text text-transparent"
            >
              go-to platform
            </motion.span>{" "}
            for seamless scheduling and bookings. We simplify the way you
            connect, schedule, and manage appointments, ensuring efficiency and
            convenience every step of the way."
          </p>
        </div>
      </motion.div>

      <div className="md:w-1/2 w-full flex flex-col items-center justify-center space-y-12">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
          style={{
            boxShadow: "0px 0px 20px rgba(255, 233, 0, 1)",
            borderRadius: "24px",
          }}
          className="w-full items-center max-w-md md:max-w-lg min-h-[200px]"
        >
          <div className="w-full mt-6 h-full flex justify-center items-center">
            <BallCanvas decal= "../src/assets/clock.png" />
            <BallCanvas decal= "../src/assets/flask.png"/>
            <BallCanvas decal= "../src/assets/schedule.png"/>
            <BallCanvas decal= "../src/assets/stack-of-books.png"/>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
          style={{
            boxShadow: "0px 0px 20px rgba(255, 233, 0, 1)",
            borderRadius: "24px",
          }}
          className="w-full max-w-md md:max-w-lg min-h-[200px] p-4 text-center"
        >
          <h1 className="text-2xl p-2">Why Us?</h1>
          <br />
          <p className="text-base text-yellow-100">
            Appointly makes scheduling simple and efficient. With an{" "}
            <motion.span className="bg-gradient-to-r font-bold from-yellow-200 to-yellow-300 bg-clip-text text-transparent">
              intuitive interface
            </motion.span>
            ,{" "}
            <motion.span className="bg-gradient-to-r font-bold from-yellow-200 to-yellow-300 bg-clip-text text-transparent">
              real-time notifications
            </motion.span>
            , and{" "}
            <motion.span className="bg-gradient-to-r font-bold from-yellow-200 to-yellow-300 bg-clip-text text-transparent">
              secure integrations
            </motion.span>
            , we help you stay organized and on track, effortlessly managing your appointments and events.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
