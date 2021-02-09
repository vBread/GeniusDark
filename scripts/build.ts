import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { renderSync } from 'sass';
import { format as fmt } from 'util';

(() => {
	const { css } = renderSync({
		indentType: 'tab',
		indentWidth: 1,
		outputStyle: 'expanded',
		file: 'src/index.scss'
	});

	const final = css
		.toString('utf8')
		.replace('@charset "UTF-8";', '')
		.replace(/#3498db/gim, 'var(--color-generic-accent)');

	const meta = readFileSync(`${__dirname}/res/metadata.txt`);
	const content = fmt(meta.toString('utf8'), final);

	const rc = readFileSync(resolve(__dirname, '..', '.prettierrc'));
	const options = JSON.parse(rc.toString('utf8'));

	writeFileSync(
		`${process.cwd()}/genius-dark.user.css`,
		format(content, { parser: 'scss', ...options })
	);
})();
