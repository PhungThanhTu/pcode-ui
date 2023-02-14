import { ComponentMeta, ComponentStory } from '@storybook/react';
import NavBar from './NavBar';

export default {
	title: 'Shared/Navigation Bar',
	component: NavBar
} as ComponentMeta<typeof NavBar>;

export const Default: ComponentStory<typeof NavBar> = () => <NavBar />;
