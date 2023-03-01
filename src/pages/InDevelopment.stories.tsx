import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { InDevelopmentPage } from './InDevelopmentPage';

export default {
	title: 'Pages/In Development Page',
	component: InDevelopmentPage
} as ComponentMeta<typeof InDevelopmentPage>;

export const Example: ComponentStory<typeof InDevelopmentPage> = () => <InDevelopmentPage />;
