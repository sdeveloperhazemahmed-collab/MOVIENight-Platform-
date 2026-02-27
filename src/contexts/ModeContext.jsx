import { createContext, useState } from "react";

export const ModeContext = createContext({
	darkMode: true,
	toggleMode: () => {},
});

export default function ModeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(false);
	const toggleMode = () => setDarkMode(prev => !prev);

	return (
		<ModeContext.Provider value={{ darkMode, toggleMode }}>
			{children}
		</ModeContext.Provider>
	);
}
