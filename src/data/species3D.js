// 3D Model Data Structure for Marine Creatures
// TODO: Replace placeholder types with actual GLB/GLTF model paths
// Future: Licensed 3D models from sources like Sketchfab, TurboSquid, etc.

export const species3DData = {
  anglerfish: {
    id: 'anglerfish',
    type: 'anglerfish',
    model: '/models/anglerfish.glb', // TODO: Replace with actual model
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    // TODO: Add actual model when licensed assets are acquired
    placeholder: true
  },
  jellyfish: {
    id: 'jellyfish',
    type: 'jellyfish',
    model: '/models/jellyfish.glb', // TODO: Replace with actual model
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    placeholder: true
  },
  turtle: {
    id: 'turtle',
    type: 'turtle',
    model: '/models/turtle.glb', // TODO: Replace with actual model
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    placeholder: true
  },
  shark: {
    id: 'shark',
    type: 'shark',
    model: '/models/shark.glb', // TODO: Replace with actual model
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    placeholder: true
  },
  whale: {
    id: 'whale',
    type: 'whale',
    model: '/models/whale.glb', // TODO: Replace with actual model
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    placeholder: true
  },
  coral: {
    id: 'coral',
    type: 'coral',
    model: '/models/coral.glb', // TODO: Replace with actual model
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    placeholder: true
  }
};

// Helper function to get creature type from species ID
export const getCreatureType = (speciesId) => {
  const data = species3DData[speciesId];
  return data ? data.type : 'fish';
};

// Helper function to check if model is placeholder
export const isPlaceholderModel = (speciesId) => {
  const data = species3DData[speciesId];
  return data ? data.placeholder : true;
};
