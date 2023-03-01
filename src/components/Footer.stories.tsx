import { ComponentMeta, ComponentStory } from '@storybook/react';
import Footer from './Footer';

export default {
    title: 'Shared/Footer',
    component: Footer
} as ComponentMeta<typeof Footer>;

export const Example: ComponentStory<typeof Footer> = () => <Footer></Footer>;
