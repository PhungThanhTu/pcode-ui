import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { InDevelopment } from './InDevelopment';

export default {
	title: 'Pages/In Development Page',
	component: InDevelopment
} as ComponentMeta<typeof InDevelopment>;

export const Example: ComponentStory<typeof InDevelopment> = () => <InDevelopment />;
