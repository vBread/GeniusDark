import { execSync } from 'child_process';
import { writeFileSync, readFileSync } from 'fs';

(async () => {
	execSync('rimraf dist && sass --no-source-map src/:dist/');

	const meta = readFileSync(`${__dirname}/res/metadata.txt`).toString('utf8');
	const css = meta.replace('%s', readFileSync(`${process.cwd()}/dist/index.css`).toString('utf8'));

	writeFileSync(`${process.cwd()}/genius-dark.user.css`, css);
})();
