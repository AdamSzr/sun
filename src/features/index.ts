export type DynamicRoute<T> = {
  params: Promise<T>
};
