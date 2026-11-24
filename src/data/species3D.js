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
    model: '/models/coral.glb',
    modelName: 'Acropora cytherea',
    credit: 'Komang / Dina3D · Dinacon 2025',
    license: 'MIT',
    source: 'https://scan3d.dinacon.org/',
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    camera: { position: [0, 0.9, 3.0], target: [0, 0.45, 0] },
    placeholder: false
  },
  'red-coral': {
    id: 'red-coral',
    type: 'coral',
    model: '/models/red-coral.glb',
    modelName: 'Pleurocorallium niveum',
    credit: 'Smithsonian NMNH, USNM 56807',
    license: 'CC0',
    source:
      'https://www.si.edu/object/3d/corallium-sp%3A7fd1cb15-599b-44e5-8a14-579dfb749434',
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    camera: { position: [0, 1.3, 3.4], target: [0, 0.9, 0] },
    placeholder: false
  },
  'cold-water-coral': {
    id: 'cold-water-coral',
    type: 'coral',
    model: '/models/cold-water-coral.glb',
    modelName: 'Desmophyllum pertusum',
    credit: 'Smithsonian NMNH, USNM 1071877',
    license: 'CC0',
    source:
      'https://3d.si.edu/object/3d/lophelia-pertusa%3A212a8c08-42e9-4895-803b-2bfc54e82c22',
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    camera: { position: [0, 1.4, 3.5], target: [0, 1.0, 0] },
    placeholder: false
  },
  'indian-ocean-coral': {
    id: 'indian-ocean-coral',
    type: 'coral',
    model: '/models/indian-ocean-coral.glb',
    modelName: 'Porites lutea',
    credit: 'Anten / Dina3D · Dinacon 2025',
    license: 'MIT',
    source: 'https://scan3d.dinacon.org/',
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    camera: { position: [0, 1.0, 3.1], target: [0, 0.5, 0] },
    placeholder: false
  }
};

// Return a real GLB configuration only when the species has a dedicated asset.
export const getSpecies3DModel = (speciesId) => {
  const data = species3DData[speciesId];
  return data && !data.placeholder && data.model ? data : null;
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

// Pick a sensible placeholder shape for every species, even when a dedicated
// model does not exist yet.
export const getCreatureTypeForSpecies = (species) => {
  if (!species) return 'fish';

  const data = species3DData[species.id];
  if (data) return data.type;

  if (species.category === '爬行動物') return 'turtle';
  if (species.category === '哺乳動物') return 'whale';
  if (species.category === '珊瑚礁' && species.name.includes('珊瑚')) return 'coral';

  return 'fish';
};
