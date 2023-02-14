import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { CustomInput } from './CustomInput';

export default {
	title: 'Shared/Custom Input',
	component: CustomInput
} as ComponentMeta<typeof CustomInput>;

export const TextInput: ComponentStory<typeof CustomInput> = () => (
	<CustomInput
		type="text"
		ariaLabel="sample"
		onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
			console.log(e.target.value);
		}}
		placeholder="Type sth sample"
	/>
);
export const PasswordInput: ComponentStory<typeof CustomInput> = () => (
	<CustomInput
		type="password"
		ariaLabel="sample"
		onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
			console.log(e.target.value);
		}}
		placeholder="Password"
	/>
);
