import { useRef } from "react";
import { useGLTF, useHelper, useTexture, SpotLight, useDepthBuffer } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { SpotLightHelper, Vector3 } from "three";

export default function Model(props) {
    const { nodes, materials } = useGLTF("/test.glb")
    const testTexture = useTexture('./bakedTest.jpg')
    testTexture.flipY = false

    const neon = useGLTF('./neon_test.glb')

    const { bloomIntensity, bloomFactor, bloomMultiplier, emissiveIntensity } = useControls({
        bloomIntensity: 0.2,
        bloomFactor: 3,
        bloomMultiplier: 5,
        emissiveIntensity: {
            value: 20,
            step: 1
        }
    })

    const depthBuffer = useDepthBuffer({ frames: 1 })

    return (
        <>
            <Perf
                position='top-left'
            />
            {/* <EffectComposer>
                <Bloom
                    // mipmapBlur
                    intensity={bloomIntensity}
                    luminanceThreshold={1}
                />
                <GodRays />
            </EffectComposer> */}
            <Lights color="red" position={[5, 6, 5]} />
            <group {...props} dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Plane.geometry}
                    scale={5}
                    rotation-y={-Math.PI * 0.25}
                >
                    <meshStandardMaterial map={testTexture} flipY />
                    {/* <meshBasicMaterial map={testTexture} flipY /> */}
                </mesh>
            </group>
            <mesh position={[2.5, 4, 0]}>
                <boxGeometry
                    args={[4, 2, 0.1]}
                />
                <meshStandardMaterial color={'red'} emissive="red" emissiveIntensity={emissiveIntensity} toneMapped={false} />
                {/* <meshBasicMaterial color={ [ bloomFactor * bloomMultiplier, 0 * bloomMultiplier, 0 * bloomMultiplier] } toneMapped={ false } /> */}
            </mesh>

            <mesh position={[0, 3, 2.5]}>
                <boxGeometry
                    args={[0.1, 2, 4]}
                />
                <meshStandardMaterial color={'blue'} emissive="blue" emissiveIntensity={emissiveIntensity} toneMapped={false} />
                {/* <meshBasicMaterial color={[0 * bloomMultiplier, 0 * bloomMultiplier, bloomFactor * bloomMultiplier]} toneMapped={false} /> */}
            </mesh>
            <primitive position={[1.5, 0.7, 1.5]} rotation-y={-(Math.PI * 0.5)} object={neon.scene} />
        </>

    );
}

const Lights = ({ vec = new Vector3(), ...props }) => {
    const light = useRef()
    // useHelper(light, SpotLightHelper, 'red')
    return (
        <>
           <SpotLight castShadow ref={light} penumbra={1} distance={10} angle={0.6} attenuation={8} anglePower={4} intensity={1} {...props} />

        </>
    )
}

useGLTF.preload("/test.glb");