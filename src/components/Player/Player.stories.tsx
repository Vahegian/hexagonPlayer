import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Player } from './Player';

export default{
  title: 'Player',
  component: Player,
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<typeof Player> = (args) => {
  return ( <Player src='https://tractive.com/assets/static/videos/ActivityMonitoring_15s_EN.mp4' /> )
}

export const Default = Template.bind({});


