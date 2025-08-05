// src/context/VerifiedContext.jsx
import { createContext, useState, useContext } from "react";

const VerifiedContext = createContext();

export const VerifiedProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  return (
    <VerifiedContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </VerifiedContext.Provider>
  );
};

export const useVerified = () => useContext(VerifiedContext);
