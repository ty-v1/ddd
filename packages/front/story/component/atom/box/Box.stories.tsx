import React from 'react';
import { Meta } from '@storybook/react';
import { Box } from '@/component/atom/box/Box';
import { BoxHeader } from '@/component/atom/box/BoxHeader';
import { BoxRow } from '@/component/atom/box/BoxRow';

Box.displayName = 'Label';

export default {
    component: Box,
    title: 'Box',
} as Meta;

const Template = () => (
    <Box>
        <BoxHeader>Header</BoxHeader>
        <BoxRow>
            Content 1
        </BoxRow>
        <BoxRow>
            Content 2
        </BoxRow>
        <BoxRow>
            Content 3
        </BoxRow>
    </Box>
);

export const Default = Template.bind({});
