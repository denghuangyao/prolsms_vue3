import { defineComponent, h } from 'vue';
let loaded = false;
if (!loaded) {
  loadSvgIcons();
  loaded = true;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
async function parseSvg(svgData: string) {
  //使用 SVGO 进行极限压缩
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(svgData, 'image/svg+xml');
  const svgElement = xmlDoc.documentElement;
  const svgContent = [...svgElement.childNodes]
    .filter((node) => node.nodeType === node.ELEMENT_NODE)
    .map((node) => new XMLSerializer().serializeToString(node))
    .join('');
  console.log('parseSvg-svgContent-', svgContent);
  const viewBoxValue = svgElement.getAttribute('viewBox') || '';
  const [_left, _top, width, height] = viewBoxValue.split(' ');
  return {
    innerHTML: svgContent,
    viewBox: viewBoxValue,
    width,
    height,
  };
}
/**
 * loadSvgIcons:加载svg并将svg文件中内容缓存在内存中
 */
export async function loadSvgIcons() {
  const svgEagers = import.meta.glob('./icons/*.svg', {
    query: '?raw',
    eager: true,
    import: 'default',
  });
  console.log('svgs--', svgEagers);
  await Promise.all(
    Object.entries(svgEagers).map(async (svg) => {
      let [key, body] = svg as [string, string];
      console.log(key);
      let iconName = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.svg'));
      dataStorage[`${iconName}`] = parseSvg(body);
      console.log('-iconName-', iconName, 'body--', dataStorage);
    }),
  );
}
export function createIcon(icon: string) {
  const svgBody = dataStorage[`${icon}`];
  return defineComponent({
    name: `icon-${icon}`,
    setup(props, { attrs }) {
      return h('svg', { ...svgBody, ...props, ...attrs });
    },
  });
}
export function getIcon(icon: string) {
  const svgBody = dataStorage[`${icon}`];
  return h('svg', { ...svgBody });
}
