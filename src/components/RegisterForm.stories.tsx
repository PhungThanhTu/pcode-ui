import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RegisterForm } from './RegisterForm';

export default {
	title: 'Login/Register Form',
	component: RegisterForm
} as ComponentMeta<typeof RegisterForm>;

export const Default: ComponentStory<typeof RegisterForm> = () => <RegisterForm />;
