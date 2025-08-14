import { BuildContext } from 'unbuild';
import { defineBuildConfig } from 'unbuild';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default defineBuildConfig({
  clean: true,
  entries: ['src/index'],
  declaration: true,
});
