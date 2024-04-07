import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { escapeSvelte } from 'mdsvex';
import { getHighlighter } from 'shiki';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	highlight: {
		highlighter: async (code = 'cpp', lang = 'text') => {
			const highlighter = await getHighlighter({
				themes: ['one-dark-pro'],
				langs: ['javascript', 'typescript', 'python', 'cpp', 'c', 'go', 'rust', 'solidity', 'bash']
			});
			await highlighter.loadLanguage(
				'javascript',
				'typescript',
				'python',
				'cpp',
				'c',
				'go',
				'rust',
				'solidity',
				'bash'
			);
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'one-dark-pro' }));
			// console.log(html);
			return `{@html \`${html}\` }`;
		}
	}
	// remarkPlugins: [],
	// rehypePlugins: []
});

export default config;
