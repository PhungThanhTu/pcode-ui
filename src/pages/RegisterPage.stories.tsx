import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RegisterPage } from './RegisterPage';

export default {
	title: 'Pages/Register Page',
	component: RegisterPage
} as ComponentMeta<typeof RegisterPage>;

export const Example: ComponentStory<typeof RegisterPage> = () => <RegisterPage />;
