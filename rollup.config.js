import analyze from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'build/index.js',
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
    }
  ],
  plugins: [
    terser({
      // prevents class names from being minified
      keep_classnames: true,
      // prevents function names from being minified
      keep_fnames: true
    }),
    analyze({ 
      summaryOnly: true 
    })
  ]
};

export default config;