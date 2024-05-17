import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Resto, Makanan, Minuman } from './definition';


export const resto =[
    {
        id_resto: 1,
        nama_resto: "J-One",
        alamat: "Perumdos ITS no 1, Keputih, Sukolilo, Surabaya",
        lat:-7.287497,
        lon: 112.79469
    },
    {
        id_resto: 2,
        nama_resto: "Kantin Pusat ITS",
        alamat: "Jl. Teknik Mesin No 173, Keputih, Sukolilo, Surabaya",
        lat:-7.283804,
        lon: 112.794089
    },
    {
        id_resto: 3,
        nama_resto: "Kantin Informatika ITS",
        alamat: "Jl. Teknik Kimia, Keputih, Sukolilo, Surabaya",
        lat:-7.280084,
        lon: 112.797003
    },
    {
        id_resto: 4,
        nama_resto: "Warung Cahaya",
        alamat: "Jl. Teknik Arsitektur, Keputih, Sukolilo, Surabaya",
        lat:-7.287635,
        lon: 112.793887
    },
    {
      id_resto: 5,
      nama_resto: "Testing",
      alamat: "Jl. Teknik Sipil, Keputih, Sukolilo, Surabaya",
      lat: -7.288242,
      lon: 112.795781
  }
]


export async function getResto() {
  try {
//     const resto = async () => sql`
//     SELECT * from Resto
// `;
//   let Nama = []
//   let Alamat = []
//   let lat = []
//   let lon =[]
//   let list = []
  const results = await sql<Resto>` SELECT * from Resto`;
//   for (let i = 0; i < results.rowCount; i++) {
//     let data = results.rows[i];
//     Nama[i] = data.nama_resto;
//     Alamat[i] = data.alamat;
//     lat[i] = data.lat;
//     lon[i] = data.lon;
//   }
//   list = [Nama,Alamat,lat,lon]

    return results.rows;
  } 
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function getMakanan(id: number) {
    try {

    const results = await sql<Makanan>` SELECT * from Makanan WHERE Id_resto = ${id}`;
    return results.rows;
    } 
    catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  export async function getMinuman(id: number) {
    try {

    const results = await sql<Minuman>` SELECT * from Minuman WHERE Id_resto = ${id}`;
    return results.rows;
    } 
    catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }