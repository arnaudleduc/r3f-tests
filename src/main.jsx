import './style/main.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { OrbitControls } from "@react-three/drei"
import { Suspense } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-10, 15, 10]
      }}
    >
      <color attach="background" args={['#202020']} />
      <fog attach="fog" args={['#202020', 5, 20]} />
      <ambientLight intensity={0.015} />
      <OrbitControls />
      <Suspense>
        <Experience />
      </Suspense>
    </Canvas>
    {/* <Experience /> */}
  </React.StrictMode>
)