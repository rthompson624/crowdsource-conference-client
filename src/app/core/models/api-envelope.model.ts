export interface ApiEnvelope<T> {
  total: number;
  limit: number;
  skip: number;
  data: Array<T>;
}
