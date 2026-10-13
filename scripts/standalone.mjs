import { build } from 'esbuild';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
const result=await build({entryPoints:['src/main.js'],bundle:true,minify:true,format:'iife',write:false,loader:{'.css':'empty'},target:'es2020'});
let html=await readFile('index.html','utf8');
const css=await readFile('src/style.css','utf8');
for (const name of ['huanghelou-chubby.png','favicon-chubby-32.png','icon-chubby-192.png','apple-touch-chubby.png']) {
  const asset=await readFile(`public/${name}`);
  html=html.replaceAll(`./${name}`,`data:image/png;base64,${asset.toString('base64')}`);
}
const js=result.outputFiles[0].text.replaceAll('</script','<\\/script');
html=html.replace('</head>',`<style>${css}</style></head>`).replace('<script type="module" src="/src/main.js"></script>',()=>`<script>${js}</script>`);
await mkdir('dist',{recursive:true});await writeFile('dist/cloud-wuhan.html',html);console.log('Standalone: dist/cloud-wuhan.html');
