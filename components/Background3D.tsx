import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, MeshDistortMaterial, Grid, Environment, PerspectiveCamera } from '@react-three/drei';
import { MathUtils, Color } from 'three';

const MouseLight = () => {
  const light = useRef<any>(null);
  
  useFrame((state) => {
    if (light.current) {
      const x = (state.pointer.x * state.viewport.width) / 2;
      const y = (state.pointer.y * state.viewport.height) / 2;
      
      // Smooth lerp
      light.current.position.x = MathUtils.lerp(light.current.position.x, x, 0.1);
      light.current.position.y = MathUtils.lerp(light.current.position.y, y, 0.1);
    }
  });

  return <pointLight ref={light} distance={10} intensity={5} color="#818cf8" />;
};

const CameraRig = () => {
  useFrame((state, delta) => {
    const targetX = -state.pointer.x * 0.5;
    const targetY = -state.pointer.y * 0.5;
    
    state.camera.position.x = MathUtils.lerp(state.camera.position.x, targetX, delta);
    state.camera.position.y = MathUtils.lerp(state.camera.position.y, targetY, delta);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

const CodeBlock = ({ position, color, speed, delay }: { position: [number, number, number], color: string, speed: number, delay: number }) => {
  const mesh = useRef<any>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime;
      mesh.current.rotation.x = Math.sin(time * speed + delay) * 0.5;
      mesh.current.rotation.y += 0.01;
      mesh.current.position.y += Math.sin(time * 0.5 + delay) * 0.005;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const CentralShape = () => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh position={[4, 0, -5]} rotation={[0, -0.5, 0]}>
        <torusKnotGeometry args={[1.4, 0.35, 200, 32]} />
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.3}
          speed={3}
          roughness={0.1}
          metalness={1}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
};

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: false }}
        eventSource={document.body}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={35} />
        
        <color attach="background" args={['#020617']} />
        
        {/* Environment & Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ec4899" />
        <MouseLight />
        
        {/* Makes materials look metallic and shiny */}
        <Environment preset="city" />

        {/* Scene Objects */}
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={80} scale={12} size={6} speed={0.4} opacity={0.5} color="#6366f1" />
        
        {/* Digital Grid Floor */}
        <Grid 
          position={[0, -6, 0]} 
          args={[30, 30]} 
          cellColor="#1e293b" 
          sectionColor="#334155" 
          fadeDistance={20} 
          fadeStrength={1.5}
        />

        <CentralShape />
        
        {/* Floating 'Tech' Blocks */}
        <CodeBlock position={[-3, 3, -4]} color="#38bdf8" speed={1.5} delay={0} />
        <CodeBlock position={[-4, -2, -6]} color="#ec4899" speed={2} delay={1} />
        <CodeBlock position={[3, -3, -2]} color="#fbbf24" speed={2.5} delay={2} />

        <CameraRig />
        <fog attach="fog" args={['#020617', 5, 30]} />
      </Canvas>
      
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/40 to-slate-950/90 pointer-events-none" />
    </div>
  );
};

export default Background3D;