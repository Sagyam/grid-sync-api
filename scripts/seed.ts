import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { CreateBatteryDto } from '../src/battery/dto/create-battery.dto';

const prisma = new PrismaClient();

const generateRandomBattery = (): CreateBatteryDto => {
  return {
    name: `${faker.location.city()}, ${faker.location.streetAddress()}`,
    postCode: faker.location.zipCode(),
    wattCapacity: faker.number.int({ min: 1000, max: 1000000 }),
    returnDate: faker.datatype.boolean(0.5) ? faker.date.future() : null,
  };
};

const seedDatabase = async () => {
  try {
    const numberOfBatteries = 10; // Adjust as needed

    for (let i = 0; i < numberOfBatteries; i++) {
      const batteryData = generateRandomBattery();

      await prisma.battery.create({
        data: batteryData,
      });
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase()
  .then(() => `Seeded database successfully!`)
  .catch((error) => console.error('Error seeding database:', error));
