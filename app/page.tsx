
"use client";
import { Canvas } from "@react-three/fiber";
import { MagicParticles } from "./components/magic/MagicParticles";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="relative h-screen w-screen bg-gray-900 text-white overflow-hidden">
      <div
        style={{ transform: "translateZ(0)" }}
        className="absolute inset-0 z-0"
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <MagicParticles />
          </Suspense>
        </Canvas>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down">
          Welcome to the Kingdom of Learning
        </h1>
        <p className="text-lg md:text-2xl mb-8 animate-fade-in-up">
          Where every lesson is an adventure.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
          Begin Your Quest
        </button>
      </main>
    </div>
  );
}
