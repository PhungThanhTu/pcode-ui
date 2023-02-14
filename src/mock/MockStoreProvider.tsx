import React from 'react';
import { Provider } from 'react-redux';
import { mockedStore } from '../redux/mockedStore';

interface PropsWithChildrenOnly {
	children: React.ReactNode;
}

const MockStoreProvider: React.FunctionComponent<PropsWithChildrenOnly> = ({ children }) => {
	return <Provider store={mockedStore}>{children}</Provider>;
};

export default MockStoreProvider;
