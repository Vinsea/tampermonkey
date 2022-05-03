/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * @deprecated
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

import * as rollup from 'rollup';
import { readFile, writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import sizes from 'rollup-plugin-sizes';
import { globby } from 'globby';

// const resolvePath = (dir)=> new URL(dir, import.meta.url).href;

const getInputOptions = (filePath) => ({
    input: `../${filePath}/index.js`,
    plugins: [
        babel({ babelHelpers: 'bundled' }),
        getBabelOutputPlugin({
            allowAllFormats: true,
            presets: ['@babel/preset-env']
        }),
        sizes()
    ]
});
const getOutputOptions = (filePath) => {
    const fileName = path.basename(filePath);
    return {
        file: `../dist/${fileName}.js`,
        format: 'iife',
        interop: 'false'
        // compact: false,
        // TODO didnt work ↓
        // indent: '    '
    };
};

/**
 * @returns {promise} 执行后的回调
 */
async function build() {
    const files = await globby('packages/**/index.js');
    console.log(files);
    for (const file of files) {
        const filePath = path.dirname(file);
        const inputOptions = getInputOptions(filePath);
        const bundle = await rollup.rollup(inputOptions);
        const outputOptions = getOutputOptions(filePath);
        const generate = await bundle.generate(outputOptions);
        const code = generate.output[0].code;
        const meta = await readFile(`../${filePath}/meta`, 'utf8');
        const codeResult = code.split('\n').map(v => (/^ {2,}/).test(v) ? `  ${v}` : v)
            .join('\n');
        // await bundle.write(outputOptions);
        await writeFile(outputOptions.file, [meta, codeResult].join('\n'), 'utf8');
        bundle.close();
    }
    console.log('done!');
}

build();
