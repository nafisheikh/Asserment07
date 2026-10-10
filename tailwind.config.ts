import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { leaf:'#23734b', ink:'#183b2b', cream:'#f8f8f1', lime:'#dff36b' }, boxShadow:{ soft:'0 12px 35px rgba(24,59,43,.08)' } } }, plugins: [] };
export default config;
