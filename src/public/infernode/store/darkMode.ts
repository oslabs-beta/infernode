import { useState } from 'react';

interface IDarkMode {
  isDarkMode: boolean
  toggle: () => void
}

function darkMode(defaultValue?: boolean): IDarkMode {
  const [darkModeState, setDarkMode] = useState<boolean>(defaultValue ?? false);

  return {
    isDarkMode: darkModeState,
    toggle: () => setDarkMode((prev: boolean) => !prev),
  };
}

export default darkMode;
