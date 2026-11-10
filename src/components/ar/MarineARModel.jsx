import MarineCreature from '../3d/MarineCreature';

// Placeholder renderer for the AR model slot.
// The public/models folder does not contain licensed GLB assets yet, so the
// shared placeholder geometry is used instead of attempting a 404 network
// request for every creature. When GLB assets are approved, replace this with
// a useGLTF loader wrapped in its own Suspense + ErrorBoundary.
const MarineARModel = ({ type, scale = 1, position = [0, 0, 0] }) => {
  return <MarineCreature type={type} scale={scale} position={position} />;
};

export default MarineARModel;
