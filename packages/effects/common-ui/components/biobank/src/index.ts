import components from './component';
import { createInstaller } from './utils/installer';
export * from './components';
const installer = createInstaller(components);
export const install = installer.install;
export const version = installer.version;
export default installer;
