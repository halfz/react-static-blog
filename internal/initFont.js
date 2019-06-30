import axios from 'axios';
import css from 'css';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const run = async (target, targetDir, fontsPath, staticDir) => {
  const fontsCss = fs.createWriteStream(target);
  fontsCss.write(Buffer.from('/* generated by script `internals/initFont.js` */'));

  await Promise.all(fs.readdirSync(fontsPath).map(async (f) => {
    const cssPath = path.join(fontsPath, f);
    const cssObject = css.parse(fs.readFileSync(cssPath, 'utf8'));
    /** @namespace cssObject.stylesheet */
    await Promise.all(cssObject.stylesheet.rules.map(async (rule) => {
      if (rule.type === 'font-face') {
        const fontSrcs = [];
        const font = {
          'font-weight': 'normal',
        };
        await Promise.all(rule.declarations.map(async (each) => {
          if (each.property === 'src') {
            const srcArr = _.split(each.value, ',');
            await Promise.all(srcArr.map(async (src) => {
              const newSrc = _.trim(src);
              const urlMatch = (/url\([^)]*(http[^')]+)[^)]*\)/g).exec(newSrc);
              if (urlMatch) {
                const url = urlMatch[1];
                const filename = _.split(_.last(_.split(url, '/')), '?')[0];
                const writer = fs.createWriteStream(targetDir + filename);
                const response = await axios({
                  url,
                  method: 'GET',
                  responseType: 'stream',
                });

                response.data.pipe(writer);

                await (new Promise((resolve, reject) => {
                  writer.on('finish', resolve);
                  writer.on('error', reject);
                }));
                fontSrcs.push(newSrc.replace(url, `${staticDir}/${filename}`));
              } else {
                fontSrcs.push(newSrc);
              }
            }));
          } else {
            font[each.property] = each.value;
          }
        }));
        font.src = _.join(fontSrcs, ', ');
        fontsCss.write(Buffer.from(`\n/* from ${cssPath}:${rule.position.start.line} */\n`));
        fontsCss.write(Buffer.from('@font-face {'));
        _.forEach(font, (v, k) => {
          fontsCss.write(Buffer.from(`\n  ${k}: ${v};`));
        });
        fontsCss.write(Buffer.from('\n}\n'));
      }
    }));
  }));
  fontsCss.write(Buffer.from('\n'));
  fontsCss.close();
};


run(`./src/generated/fonts.css`, `./src/generated/fonts/`, './internal/webfonts', 'fonts');
