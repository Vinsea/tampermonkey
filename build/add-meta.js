const { readFile, writeFile, readdir } = require('fs/promises');
const path = require('path');
// const globby = require('globby');
const resolvePath = (dir) => path.join(__dirname, dir);

(async () => {
    const paths = await readdir(resolvePath('../packages'));
    console.log(paths);
    for (const file of paths) {
        const meta = await readFile(resolvePath(`../packages/${file}/meta`), 'utf8');
        if (!meta) {
            continue;
        }
        const distPath = resolvePath(`../dist/${file}.js`);
        const dist = await readFile(distPath, 'utf8');
        const codeResult = dist.split('\n').map(v => (/^ {2,}/).test(v) ? `  ${v}` : v)
            .join('\n');
        const result = `${meta}\n\n${codeResult}`;
        await writeFile(distPath, result);
    }
    console.log('done');
})();
