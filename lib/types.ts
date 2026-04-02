export interface Brand {
  name: string
}

export interface DupeBrand {
  name: string
  website: string | null
}

export interface DupeProduct {
  id: number
  name: string
  price: number | null
  currency: string | null
  link: string | null
  image_url: string | null
  dupe_brand: DupeBrand | null
}

export interface Perfume {
  id: number
  name: string
  sex: 'M' | 'F' | 'U' | null
  image_url: string | null
  brand: Brand | null
}

export interface PerfumeDetail extends Perfume {
  price: number | null
  price_currency: string | null
  price_url: string | null
  dupe_mapping: Array<{
    dupe_product: DupeProduct | null
  }>
}
