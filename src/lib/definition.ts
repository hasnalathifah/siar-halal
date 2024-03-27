export type Resto = {
  id_resto: number,
  nama_resto: string,
  alamat: string,
  lat: number,
  lon: number
}

export type Makanan = {
  id_food: number,
  id_resto: number,
  nama_makanan: string,
  deskripsi_makanan: string,
  harga_makanan: number
}

export type Minuman = {
  id_food: number,
  id_resto: number,
  nama_minuman: string,
  deskripsi_minuman: string,
  harga_minuman: number
}