import { ComponentMeta, ComponentStory } from '@storybook/react';
import MockStoreProvider from '../mock/MockStoreProvider';
import { LoginPage } from './LoginPage';

export default {
	title: 'Pages/Login Page',
	component: LoginPage
} as ComponentMeta<typeof LoginPage>;

export const Default: ComponentStory<typeof LoginPage> = () => (
	<MockStoreProvider>
		<LoginPage />
	</MockStoreProvider>
);
