// host/src/declares.d.ts
declare module 'mapMFE/MapComponent';
declare module 'toolsMFE/ImportComponent';
declare module 'host/geoStore';


declare module 'mapMFE/MapComponent' {
    import { ComponentType } from 'react';
    const MapComponent: ComponentType<unknown>;
    export default MapComponent;
    export const getMapInstance: () => unknown;
  }
  
  declare module 'toolsMFE/ImportComponent' {
    import { ComponentType } from 'react';
    const ImportComponent: ComponentType<unknown>;
    export default ImportComponent;
  }
  
  // Not needed since this is local
  // declare module 'host/geoStore';