export function addMapItem<T, K>(map: T, name: string, item: K): T {
  return { ...map, ...{ [name]: item } };
}

export function removeMapItem<T>(map: T, name: string): T {
  const newMap = { ...map };
  if (map[name]) {
    delete newMap[name];
  }
  return newMap;
}
