// import { readFile, writeFile } from 'node:fs/promises';
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
// import multi from '@rollup/plugin-multi-entry';
import sizes from 'rollup-plugin-sizes';

export default {
    // input: 'packages/**/index.js',
    input: 'packages/auto-focus/index.js',
    output: {
        dir: 'dist',
        entryFileNames: 'auto-focus.user.js',
        format: 'iife'
    },
    plugins: [
        // multi(),
        babel({ babelHelpers: 'bundled' }),
        getBabelOutputPlugin({
            allowAllFormats: true,
            presets: ['@babel/preset-env']
        }),
        sizes()
    ]
};
