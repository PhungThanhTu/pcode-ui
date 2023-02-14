import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { CodeEditor } from './CodeEditor';

export default {
	title: 'Core/Code Editor',
	component: CodeEditor
} as ComponentMeta<typeof CodeEditor>;

export const Example: ComponentStory<typeof CodeEditor> = () => <CodeEditor></CodeEditor>;
