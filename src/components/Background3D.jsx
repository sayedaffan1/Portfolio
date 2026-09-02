import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

function Particles() {
  const ref = useRef();
  const positions = useMemo(() => { const mobile = innerWidth < 800; const points = mobile ? 700 : 1800; const a = new Float32Array(points * 3); for (let i = 0; i < a.length; i++) a[i] = (Math.random() - .5) * 24; return a; }, []);
  useFrame((state) => { if (ref.current) { ref.current.rotation.y = state.clock.elapsedTime * .018 + state.pointer.x * .08; ref.current.rotation.x = state.pointer.y * .06; } });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} /></bufferGeometry><PointMaterial transparent color="#64f5d4" size={.018} sizeAttenuation depthWrite={false} /></points>;
}
function StarRain() {
  const geometry = useRef();
  const { size } = useThree();
  const data = useMemo(() => {
    const count = innerWidth < 800 ? 26 : 58;
    const positions = new Float32Array(count * 6);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - .5) * 18, y = (Math.random() - .5) * 16, z = (Math.random() - .5) * 9 - 2, length = .18 + Math.random() * .42;
      positions.set([x, y, z, x, y - length, z], i * 6);
      speeds[i] = .7 + Math.random() * 1.3;
    }
    return { positions, speeds, count };
  }, []);
  useFrame((_, delta) => {
    const attr = geometry.current?.attributes.position;
    if (!attr) return;
    for (let i = 0; i < data.count; i++) {
      const offset = i * 6, fall = data.speeds[i] * delta;
      attr.array[offset + 1] -= fall; attr.array[offset + 4] -= fall;
      if (attr.array[offset + 4] < -8) { const x = (Math.random() - .5) * 18, z = (Math.random() - .5) * 9 - 2, y = 8; attr.array[offset] = attr.array[offset + 3] = x; attr.array[offset + 1] = y; attr.array[offset + 4] = y - (.18 + Math.random() * .42); attr.array[offset + 2] = attr.array[offset + 5] = z; }
    }
    attr.needsUpdate = true;
  });
  return <lineSegments><bufferGeometry ref={geometry}><bufferAttribute attach="attributes-position" array={data.positions} count={data.positions.length / 3} itemSize={3} /></bufferGeometry><lineBasicMaterial color="#9dfceb" transparent opacity={size.width < 800 ? .13 : .19} /></lineSegments>;
}
function Geometry() { const ref = useRef(); const { size } = useThree(); const isMobile = size.width < 800; const baseX = isMobile ? 0 : 4.8; const baseY = isMobile ? -1.3 : .5; const scale = isMobile ? .72 : 1; useFrame((state) => { if (!ref.current) return; ref.current.rotation.x = state.clock.elapsedTime * .12; ref.current.rotation.y = state.clock.elapsedTime * .18; ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * .7) * (isMobile ? .22 : .45); ref.current.position.x = baseX + state.pointer.x * (isMobile ? .18 : .4); }); return <group ref={ref} position={[baseX, baseY, -4]} scale={scale}><mesh><icosahedronGeometry args={[1.7, 2]} /><meshBasicMaterial color="#20d9c2" wireframe transparent opacity={.28} /></mesh><gridHelper args={[isMobile ? 7 : 10, isMobile ? 9 : 12, "#1d827a", "#102c31"]} rotation={[Math.PI / 2.1, 0, 0]} position={[0, 0, -2]} /></group>; }
export default function Background3D() { return <div className="three-bg"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 60 }}><Particles /><StarRain /><Geometry /></Canvas></div>; }
