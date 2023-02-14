import { ComponentMeta, ComponentStory } from '@storybook/react';
import MockStoreProvider from '../mock/MockStoreProvider';
import { LoginForm } from './LoginForm';

export default {
	title: 'Login/LoginForm',
	component: LoginForm
} as ComponentMeta<typeof LoginForm>;

export const Default: ComponentStory<typeof LoginForm> = () => (
	<MockStoreProvider>
		<LoginForm />
	</MockStoreProvider>
);
