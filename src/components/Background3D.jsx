import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

function Particles() {
  const ref = useRef();
  const positions = useMemo(() => { const points = innerWidth < 800 ? 520 : 1200; const values = new Float32Array(points * 3); for (let i = 0; i < values.length; i++) values[i] = (Math.random() - .5) * 24; return values; }, []);
  useFrame(state => { if (ref.current) { ref.current.rotation.y = state.clock.elapsedTime * .012 + state.pointer.x * .045; ref.current.rotation.x = state.pointer.y * .035; } });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} /></bufferGeometry><PointMaterial transparent color="#64f5d4" size={.014} sizeAttenuation depthWrite={false} opacity={.65} /></points>;
}
export default function Background3D() { return <div className="three-bg"><Canvas dpr={[1, 1.5]} camera={{ position:[0, 0, 7], fov:60 }}><Particles /></Canvas></div>; }
