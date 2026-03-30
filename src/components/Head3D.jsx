import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const model = useGLTF('/face.obj'); // we will fix this below

  return (
    <primitive 
      object={model.scene} 
      scale={1.8}
      position={[0, -1.5, 0]}
    />
  );
}

export default function Head3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <pointLight position={[-2, -2, -2]} intensity={0.5} />

      {/* Model */}
      <Model />

      {/* Controls (THIS IS THE MAGIC) */}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={1}
      />
    </Canvas>
  );
}