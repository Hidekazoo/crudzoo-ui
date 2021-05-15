import { action } from "@storybook/addon-actions";
import { Button, ButtonProps } from "../src/components/button";
import React, { ElementType } from "react";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Test</Button>;
export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Button",
};
