import React, { useState, useCallback } from "react";
import createSafeContext from "../../lib/createSafeContext";

export const [usePortal, Provider] = createSafeContext();
export const [usePortalData, PortalDataProvider] = createSafeContext();

export default function PortalProvider({ children }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const [miniModalMediaData, setMiniModalMediaData] = useState(null);
  const [mediaTypeData, setMediaTypeData] = useState(null);

  const handleChangePortal = useCallback((anchor, media, mediaType) => {
    setAnchorElement(anchor);
    setMiniModalMediaData(media);
    setMediaTypeData(mediaType);
  }, []);

  return (
    <Provider value={handleChangePortal}>
      <PortalDataProvider
        value={{
          anchorElement,
          miniModalMediaData,
          mediaTypeData,
        }}
      >
        {children}
      </PortalDataProvider>
    </Provider>
  );
}
