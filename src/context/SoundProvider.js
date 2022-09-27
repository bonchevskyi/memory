import { createContext, useState } from "react";

const SoundContext = createContext({});

export const SoundProvider = ({ children }) => {
  const [sounds, setSounds] = useState(() => {
    const json = localStorage.getItem("sounds");
    const saved = JSON.parse(json);
    if (json === null) {
      localStorage.setItem("sounds", JSON.stringify(true));
      return true;
    } else {
      return saved;
    }
  });

  const values = { sounds, setSounds };

  return (
    <SoundContext.Provider value={values}>{children}</SoundContext.Provider>
  );
};

export default SoundContext;
