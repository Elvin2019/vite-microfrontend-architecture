import React, { Suspense } from 'react';
const MapApp = React.lazy(() => import('mapMFE/MapComponent'));
const ImportApp = React.lazy(() => import('toolsMFE/ImportComponent'));

function App() {
  return (
    <div>
      <h1>🌍 Microfrontend Host</h1>
      <Suspense fallback={<div>Loading Import Component...</div>}>
        <div style={{ marginBottom: '20px' }}>
          <ImportApp />
        </div>
      </Suspense>
      <Suspense fallback={<div>Loading Map Component...</div>}>
        <div>
          <MapApp />
        </div>
      </Suspense>
    </div>
  );
}

export default App;