import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Classroom } from "../../public/models/Classroom";
import { CameraManager } from "./CameraManager";

const Experience = () => {
  return (
    <Canvas className="canvas" camera={{ position: [0, 0, 5.5] }}>
      <CameraManager />
      <Environment preset="sunset" />
      <ambientLight intensity={0.8} color={"pink"} />

      <Classroom position={[0, -8, 0]} rotation={[0, Math.PI, 0]} />

    </Canvas>
  );
};

export default Experience;
