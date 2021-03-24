import { readFileSync, writeFileSync } from 'fs';
import { render } from 'mustache';
import { renderSync } from 'sass';
import { author, description, version } from '../package.json';

(() => {
	const compiled = renderSync({
		indentType: 'tab',
		indentWidth: 1,
		outputStyle: 'expanded',
		file: 'src/index.scss'
	});

	let css = compiled.css
		.toString('utf-8')
		.replace('@charset "UTF-8";', '')
		.replace(/#3498db/gim, 'var(--color-generic-accent)')
		.replace(/url\("(\/.+\.(\w{3}))"\)/gm, (_, path, extension) => {
			const base64 = readFileSync(process.cwd() + path).toString('base64');
			const prefix = `data:image/${
				extension === 'jpg' ? 'jpeg' : `${extension}+xml`
			};base64,`;

			return `url("${prefix + base64}")`;
		});

	const meta = readFileSync(`${__dirname}/res/metadata.txt`);
	css = render(meta.toString('utf8'), { author, description, version, css });

	writeFileSync(`${process.cwd()}/genius-dark.user.css`, css);
})();
