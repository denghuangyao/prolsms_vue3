interface TreeConfigOptions {
  //遍历子属性名称：默认'children'
  childProps: string
}
/**
 *
 * @param tree
 * @param getValue
 * @param options
 * @returns
 */
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

function filterTree<T extends Record<string, any>>(
  tree: T[],
  filter: (node: T) => boolean,
  option?: TreeConfigOptions,
): T[] {
  let { childProps } = option || { childProps: 'children' }
  const _filterTree = (nodes: T[]): T[] => {
    return nodes.filter((node: Record<string, any>) => {
      if (filter(node as T)) {
        if (node[childProps]) {
          node[childProps] = _filterTree(node[childProps])
        }
        return true
      }
      return false
    })
  }
  return _filterTree(tree)
}

export { traverseTreeValues, filterTree }
