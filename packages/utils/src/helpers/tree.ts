interface TreeConfigOptions {
  //遍历子属性名称：默认'children'
  childProps: string;
}
/**
 * 遍历树形结构，并返回所有节点中指定的值。
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
  let { childProps } = options || { childProps: 'children' };
  let results: V[] = [];
  const traverse = (treeNode: T) => {
    const value = getValue(treeNode);
    results.push(value);
    const children = (treeNode as Record<string, any>)?.[childProps];
    if (!children) return;
    if (children.length) {
      for (const child of children) {
        traverse(child);
      }
    }
  };
  for (const treeNode of tree) {
    traverse(treeNode);
  }
  return results.filter(Boolean);
}
/**
 * 根据条件过滤给定树结构的节点，并以原有顺序返回所有匹配节点的数组。
 * @param tree
 * @param filter
 * @param option
 * @returns
 */
function filterTree<T extends Record<string, any>>(
  tree: T[],
  filter: (node: T) => boolean,
  option?: TreeConfigOptions,
): T[] {
  let { childProps } = option || { childProps: 'children' };
  const _filterTree = (nodes: T[]): T[] => {
    return nodes.filter((node: Record<string, any>) => {
      if (filter(node as T)) {
        if (node[childProps]) {
          node[childProps] = _filterTree(node[childProps]);
        }
        return true;
      }
      return false;
    });
  };
  return _filterTree(tree);
}
/**
 * 根据条件重新映射给定树结构的节点
 * @param tree
 * @param mapper
 * @param option
 * @returns
 */
function mapTree<T, V extends Record<string, any>>(
  tree: T[],
  mapper: (node: T) => V,
  option?: TreeConfigOptions,
) {
  let { childProps } = option || { childProps: 'children' };
  return tree.map((node) => {
    const mapperNode: Record<string, any> = mapper(node);
    if (mapperNode[childProps]) {
      mapperNode[childProps] = mapTree(mapperNode[childProps], mapper, option);
    }
    return mapperNode as V;
  });
}
export { traverseTreeValues, filterTree, mapTree };
