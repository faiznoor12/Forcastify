export interface location {
  data: Data[];
  metadata: Metadata;
}

export interface Metadata {
  currentOffset: number;
  totalCount: number;
}

export interface Data {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}
