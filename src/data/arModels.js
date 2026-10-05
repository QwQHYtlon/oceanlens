// AR Model Data Structure for Marine Creatures
// TODO: Replace placeholder types with actual GLB/GLTF models
// Future: Licensed 3D models from sources like Sketchfab, TurboSquid, etc.

export const arModelsData = {
  anglerfish: {
    id: 'anglerfish',
    speciesId: 'anglerfish',
    type: 'anglerfish',
    modelPath: '/models/anglerfish.glb', // TODO: Replace with actual model
    markerPath: '/ar/oceanlens-marker.png',
    scale: 1.5,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    nameZh: '深海鮟鱇魚',
    nameEn: 'Anglerfish',
    depth: '1000–4000 m',
    description: '生活於深海區域，利用發光器官吸引獵物。',
    placeholder: true
  },
  jellyfish: {
    id: 'jellyfish',
    speciesId: 'jellyfish',
    type: 'jellyfish',
    modelPath: '/models/jellyfish.glb', // TODO: Replace with actual model
    markerPath: '/ar/oceanlens-marker.png',
    scale: 1.2,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    nameZh: '水母',
    nameEn: 'Jellyfish',
    depth: '0–1000 m',
    description: '漂浮在海洋中的膠質生物，觸手帶有刺細胞。',
    placeholder: true
  },
  turtle: {
    id: 'turtle',
    speciesId: 'turtle',
    type: 'turtle',
    modelPath: '/models/turtle.glb', // TODO: Replace with actual model
    markerPath: '/ar/oceanlens-marker.png',
    scale: 1.3,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    nameZh: '海龜',
    nameEn: 'Sea Turtle',
    depth: '0–200 m',
    description: '海洋中的長壽爬行動物，具有重要的生態價值。',
    placeholder: true
  },
  shark: {
    id: 'shark',
    speciesId: 'shark',
    type: 'shark',
    modelPath: '/models/shark.glb', // TODO: Replace with actual model
    markerPath: '/ar/oceanlens-marker.png',
    scale: 1.8,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    nameZh: '大白鯊',
    nameEn: 'Great White Shark',
    depth: '0–1000 m',
    description: '海洋頂級掠食者，對維持海洋生態平衡至關重要。',
    placeholder: true
  },
  whale: {
    id: 'whale',
    speciesId: 'whale',
    type: 'whale',
    modelPath: '/models/whale.glb', // TODO: Replace with actual model
    markerPath: '/ar/oceanlens-marker.png',
    scale: 2.0,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    nameZh: '藍鯨',
    nameEn: 'Blue Whale',
    depth: '0–500 m',
    description: '地球上最大的動物，以磷蝦為主要食物來源。',
    placeholder: true
  },
  coral: {
    id: 'coral',
    speciesId: 'coral',
    type: 'coral',
    modelPath: '/models/coral.glb', // TODO: Replace with actual model
    markerPath: '/ar/oceanlens-marker.png',
    scale: 1.0,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
    nameZh: '珊瑚',
    nameEn: 'Coral',
    depth: '0–100 m',
    description: '海洋生態系統的基礎，為無數海洋生物提供棲息地。',
    placeholder: true
  }
};

// Helper function to get AR model data by species ID
export const getARModelData = (speciesId) => {
  return arModelsData[speciesId] || null;
};

// Helper function to check if model is placeholder
export const isPlaceholderARModel = (speciesId) => {
  const data = arModelsData[speciesId];
  return data ? data.placeholder : true;
};

// Helper function to get model info for AR info card
export const getARModelInfo = (speciesId) => {
  const data = arModelsData[speciesId];
  if (!data) return null;
  
  return {
    name: data.nameZh,
    englishName: data.nameEn,
    depth: data.depth,
    description: data.description
  };
};
