import type { Plugin } from 'vue';
import { withInstall } from './utils/plugin';
import {
  refrigerator,
  rackRowPlane,
  rackColumnPlane,
  liquidNitrogenContainer,
  handbasketRowPlane,
  boxPlane,
} from './components';

const Refrigerator = withInstall(refrigerator, {
  rackRowPlane,
});
const RackColumnPlane = withInstall(rackColumnPlane);
const LiquidNitrogenContainer = withInstall(liquidNitrogenContainer, {
  handbasketRowPlane,
});
const BoxPlane = withInstall(boxPlane);
export default [Refrigerator, RackColumnPlane, LiquidNitrogenContainer, BoxPlane] as Plugin[];
