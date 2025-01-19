

// Desk.jsx
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Calendar = (props) => {
  const group = useRef();
  
  // Load the GLTF model
  const { scene, nodes, materials } = useGLTF('/models/calender.glb');

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
useGLTF.preload('/models/calender.glb');

export default Calendar;
