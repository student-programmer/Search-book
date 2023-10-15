import React, { createContext, useContext } from 'react';
import { store } from './store';

const MobXContext = createContext(store);

interface MobXProviderProps {
	children: React.ReactNode;
}

export const MobXProvider: React.FC<MobXProviderProps> = ({ children }) => {
	return <MobXContext.Provider value={store}>{children}</MobXContext.Provider>;
};

export const useMobXStore = () => {
	return useContext(MobXContext);
};
