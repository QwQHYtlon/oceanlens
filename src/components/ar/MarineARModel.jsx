import MarineCreature from '../3d/MarineCreature';

// Lightweight placeholder renderer for non-coral AR slots.
// Coral species load their dedicated scan through MindARController's
// GLTFLoader path; other species still use shared placeholder geometry.
const MarineARModel = ({ type, scale = 1, position = [0, 0, 0] }) => {
  return <MarineCreature type={type} scale={scale} position={position} />;
};

export default MarineARModel;
