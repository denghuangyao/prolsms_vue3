export function useResponseSuccess<T = any>(data: T) {
  return {
    code: 0,
    result: data,
    error: null,
    message: 'success',
  };
}
export function useResponseError(message: string, error: any = null) {
  return {
    code: -1,
    result: null,
    error,
    message,
  };
}
export function usePageResponseSuccess<T = any>(
  page: number | string,
  pageSize: number | string,
  list: T[],
  { message = 'success' } = {},
) {
  const pageData = pagination(Number(parseInt(`${page}`)), Number(parseInt(`${pageSize}`)), list);
  return {
    ...useResponseSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}
export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
  let offset = (pageNo - 1) * Number(pageSize);
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset)
    : array.slice(offset, offset + Number(pageSize));
}

/**
 *401,登录失效
 */
export function unAuthorizedResponse() {
  return useResponseError('Unauthorized Exception', 'Unauthorized Exception');
}
