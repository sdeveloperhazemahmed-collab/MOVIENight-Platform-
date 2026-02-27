import { createContext, useState } from "react";

export const UsedBtnContext = createContext();

export default function UsedBtnProvider({ children }) {
	const [selectedBtn, setSelectedBtn] = useState("disney");

	return (
		<UsedBtnContext.Provider value={{ selectedBtn, setSelectedBtn }}>
			{children}
		</UsedBtnContext.Provider>
	);
}
