import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

function Particles() {
  const ref = useRef();
  const positions = useMemo(() => { const mobile = innerWidth < 800; const points = mobile ? 700 : 1800; const a = new Float32Array(points * 3); for (let i = 0; i < a.length; i++) a[i] = (Math.random() - .5) * 24; return a; }, []);
  useFrame((state) => { if (ref.current) { ref.current.rotation.y = state.clock.elapsedTime * .018 + state.pointer.x * .08; ref.current.rotation.x = state.pointer.y * .06; } });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} /></bufferGeometry><PointMaterial transparent color="#64f5d4" size={.018} sizeAttenuation depthWrite={false} /></points>;
}
function Geometry() { const ref = useRef(); const { size } = useThree(); const isMobile = size.width < 800; const baseX = isMobile ? 0 : 4.8; const baseY = isMobile ? -1.3 : .5; const scale = isMobile ? .72 : 1; useFrame((state) => { if (!ref.current) return; ref.current.rotation.x = state.clock.elapsedTime * .12; ref.current.rotation.y = state.clock.elapsedTime * .18; ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * .7) * (isMobile ? .22 : .45); ref.current.position.x = baseX + state.pointer.x * (isMobile ? .18 : .4); }); return <group ref={ref} position={[baseX, baseY, -4]} scale={scale}><mesh><icosahedronGeometry args={[1.7, 2]} /><meshBasicMaterial color="#20d9c2" wireframe transparent opacity={.28} /></mesh><gridHelper args={[isMobile ? 7 : 10, isMobile ? 9 : 12, "#1d827a", "#102c31"]} rotation={[Math.PI / 2.1, 0, 0]} position={[0, 0, -2]} /></group>; }
export default function Background3D() { return <div className="three-bg"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 60 }}><Particles /><Geometry /></Canvas></div>; }
