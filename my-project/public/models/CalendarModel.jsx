

// Desk.jsx
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from "maath";

const CalendarModel = (props) => {
  const group = useRef();
  
  // Load the GLTF model
  const { scene, nodes, materials } = useGLTF('models/calendar.glb');

  useFrame((state, delta) =>{
    if (!props.isMobile){
      easing.dampE(group.current.rotation, [-props.mousePosition.y/5, props.mousePosition.x/3, 0])
    }
    else{
      group.current.rotation.y += delta/2
    }
  
    })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Render the loaded scene */}
      <primitive object={scene} />
      
      {/* Example: Customize materials or nodes if needed */}
      {/* <mesh
        geometry={nodes.Table.geometry}
        material={materials.Wood}
      /> */}
    </group>
  );
};

// Preload the GLTF model for optimization
useGLTF.preload('models/calendar.glb');

export default CalendarModel;
