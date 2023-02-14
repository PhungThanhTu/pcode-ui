import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { CustomButton } from './CustomButton';

export default {
	title: 'Shared/Custom Button',
	component: CustomButton
} as ComponentMeta<typeof CustomButton>;

export const Example: ComponentStory<typeof CustomButton> = () => (
	<CustomButton
		content="Sample Button"
		onClick={() => {
			console.log('Hi Mom');
		}}
	/>
);
