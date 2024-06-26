module.exports = {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          'tailwindcss',
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              stage: 3,
              features: {
                clamp: true,
                'font-format-keywords': true,
                'logical-properties-and-values': true,
                'place-properties': true,
                'system-ui-font-family': true,
              },
              autoprefixer: { flexbox: false },
            },
          ],
          [
            'cssnano',
            {
              preset: [
                'default',
                { discardComments: { removeAll: true } },
              ],
            },
          ],
        ]
      : [
          'tailwindcss',
          'postcss-flexbugs-fixes',
          [
            'autoprefixer',
            { flexbox: false },
          ],
        ],
};
