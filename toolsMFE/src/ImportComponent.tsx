import { fromLonLat } from 'ol/proj';
import React, { useEffect, useState } from 'react';
const AZERBAIJAN_CENTER = [47.5769, 40.1431];
const ImportComponent = () => {
  const [setFeaturesFunction, setSetFeaturesFunction] = useState<null | ((features: any[]) => void)>(null);

  useEffect(() => {
    const loadStore = async () => {
      try {
        const remote = await import('host/geoStore');
        console.log('Loaded remote store:', remote); 
        
        // Try to access the store in different ways
        const store = remote.default?.useGeoStore || remote.useGeoStore;
        
        if (store && store.getState) {
          // Save the setFeatures function from the store
          const setFeatures = store.getState().setFeatures;
          console.log('🔗 ImportComponent connected to Zustand store', setFeatures);
          setSetFeaturesFunction(() => setFeatures);
        } else {
          console.error('Failed to load useGeoStore from host:', remote);
        }
      } catch (err) {
        console.error('Error loading store from host:', err);
      }
    };
    
    loadStore();
  }, []);
  
  const handleImport = () => {
    const features = [
      { id: '1', name: 'Point A', geometry: fromLonLat(AZERBAIJAN_CENTER) },
      { id: '2', name: 'Point B', geometry: fromLonLat([AZERBAIJAN_CENTER[0] + 2, AZERBAIJAN_CENTER[1]]) },
    ];
    console.log('📥 Importing features:', features);
    
    // Use the function from state
    if (setFeaturesFunction) {
      setFeaturesFunction(features);
      console.log('✅ Features set in store');
    } else {
      console.error('❌ setFeatures function not available');
    }
  };

  return (
    <div>
      <h2>📥 Import Panel</h2>
      <button onClick={handleImport} disabled={!setFeaturesFunction}>
        Import Sample Data
      </button>
      {!setFeaturesFunction && <p>Loading store...</p>}
    </div>
  );
};

export default ImportComponent;
