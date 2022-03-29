import '!style-loader!css-loader!sass-loader!../src/style/index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <div data-color-mode="dark" data-dark-theme="dark_dimmed">
        {Story()}
      </div>
    </>
  ),
];
