interface TreeConfigOptions {
  //遍历子属性名称：默认'children'
  childProps: string
}
function traverseTreeValues<T, V>(
  tree: T[],
  getValue: (node: T) => V,
  options?: TreeConfigOptions,
) {
  let { childProps } = options || { childProps: 'children' }
}
export { traverseTreeValues }
