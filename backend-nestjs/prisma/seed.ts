import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const seedData = async () => {
  const URL_RAJA_ONGKIR_PROVINCE = process.env.API_RAJAONGKIR_PROVINCE;
  const URL_RAJA_ONGKIR_CITY = process.env.API_RAJAONGKIR_CITY;
  const RAJAONGKIR_KEY = process.env.RAJAONGKIR_KEY;

  const provinceResponse = await axios.get(URL_RAJA_ONGKIR_PROVINCE, {
    headers: { key: RAJAONGKIR_KEY },
  });
  const provinces = provinceResponse.data.rajaongkir.results;
  for (const province of provinces) {
    await prisma.masterprovince.create({
      data: {
        province: province.province,
        updateAt: new Date(),
      },
    });
  }

  const cityResponse = await axios.get(URL_RAJA_ONGKIR_CITY, {
    headers: { key: RAJAONGKIR_KEY },
  });
  const cities = cityResponse.data.rajaongkir.results;
  for (const city of cities) {
    await prisma.mastercity.create({
      data: {
        province_id: parseInt(city.province_id),
        type: city.type,
        city_name: city.city_name,
        postal_code: city.postal_code,
        updateAt: new Date(),
      },
    });
  }
};

seedData()
  .then(() => {
    console.log('Data seeded successfully');
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
    prisma.$disconnect();
  });

//npx ts-node prisma/seed.ts
