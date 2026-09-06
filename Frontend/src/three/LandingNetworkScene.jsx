import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Line } from "@react-three/drei"
import { useRef } from "react"

const nodes = [
    [-2.1, 1.1, 0],
    [-0.7, 1.8, -0.5],
    [0.8, 1.2, 0.4],
    [2.0, 0.7, -0.2],
    [-1.7, -0.6, 0.3],
    [-0.2, -0.2, -0.4],
    [1.3, -0.7, 0.5],
    [0.1, -1.6, 0],
]

const Network = () => {
    const groupRef = useRef(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        groupRef.current.rotation.y += delta * 0.035;

        groupRef.current.rotation.x =
            Math.sin(state.clock.elapsedTime * 0.18) * 0.05;
    });

    return (
        <Float
            speed={0.45}
            floatIntensity={0.15}
            rotationIntensity={0.05}
        >
            <group ref={groupRef}>
                {connections.map(([start, end], index) => (
                    <Line
                        key={index}
                        points={[
                            nodes[start],
                            nodes[end],
                        ]}
                        color="#7c3aed"
                        transparent
                        opacity={0.18}
                        lineWidth={0.7}
                    />
                ))}


                {nodes.map((position, index) => (
                    <mesh
                        key={index}
                        position={position}
                    >
                        <sphereGeometry
                            args={[
                                index === 5 ? 0.12 : 0.075,
                                16,
                                16,
                            ]}
                        />

                        <meshBasicMaterial
                            color={
                                index === 5
                                    ? "#a78bfa"
                                    : "#7c3aed"
                            }
                            transparent
                            opacity={
                                index === 5
                                    ? 0.9
                                    : 0.65
                            }
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
};


const LandingNetworkScene = () => {
    return (
        <div
            className="
        absolute
        inset-0
        pointer-events-none
      "
        >
            <Canvas
                dpr={[1, 1.5]}
                camera={{
                    position: [0, 0, 6],
                    fov: 42,
                }}
                gl={{
                    alpha: true,
                    antialias: true,
                }}
            >
                <Network />
            </Canvas>
        </div>
    );
};

export default LandingNetworkScene;