import { defineBuildConfig } from 'unbuild';
export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      loaders: ['vue'],
      pattern: ['**/*.vue'],
    },
    {
      builder: 'mkdist',
      input: './src',
      format: 'esm',
      loaders: ['js'],
      pattern: ['**/*.ts'],
    },
  ],
});
