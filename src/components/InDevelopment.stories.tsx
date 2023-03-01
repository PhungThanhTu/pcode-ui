import { ComponentMeta, ComponentStory } from '@storybook/react';
import InDevelopment from './InDevelopment';

export default {
    title: 'Shared/InDevelopment',
    component: InDevelopment
} as ComponentMeta<typeof InDevelopment>;

export const Example: ComponentStory<typeof InDevelopment> = () => <InDevelopment></InDevelopment>;
