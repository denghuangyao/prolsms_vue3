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
  let results: V[] = []
  const traverse = (treeNode: T) => {
    const value = getValue(treeNode)
    results.push(value)
    const children = (treeNode as Record<string, any>)?.[childProps]
    if (!children) return
    if (children.length) {
      for (const child of children) {
        traverse(child)
      }
    }
  }
  for (const treeNode of tree) {
    traverse(treeNode)
  }
  return results
}
export { traverseTreeValues }
