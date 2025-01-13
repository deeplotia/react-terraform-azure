import React, { createContext, useContext, useEffect, useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

const msalConfig = {
  auth: {
    clientId: 'b9066614-5130-4543-94e4-1d0c52be1c98',
    authority: 'https://login.microsoftonline.com/f854fda6-184f-4f40-a5e2-83a4f8924a15',
    redirectUri: 'https://reactappstoragedoacademy.z6.web.core.windows.net',
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.initialize();
      setIsInitialized(true);
    };

    initializeMsal();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <MsalProvider instance={msalInstance}>
      <AuthContext.Provider value={{}}>
        {children}
      </AuthContext.Provider>
    </MsalProvider>
  );
};

export const useAuth = () => useContext(AuthContext);