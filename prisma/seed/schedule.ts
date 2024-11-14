import prisma from '../prisma'

export async function createSchedule() {
  await prisma.schedule.upsert({
    where: { name: 'Monday' },
    update: {},
    create: {
      name: 'Monday',
      input: '08:30',
      output: '18:00',
    },
  })

  await prisma.schedule.upsert({
    where: { name: 'Tuesday' },
    update: {},
    create: {
      name: 'Tuesday',
      input: '08:30',
      output: '18:00',
    },
  })

  await prisma.schedule.upsert({
    where: { name: 'Wednesday' },
    update: {},
    create: {
      name: 'Wednesday',
      input: '08:30',
      output: '18:00',
    },
  })

  await prisma.schedule.upsert({
    where: { name: 'Thursday' },
    update: {},
    create: {
      name: 'Thursday',
      input: '08:30',
      output: '18:00',
    },
  })

  await prisma.schedule.upsert({
    where: { name: 'Friday' },
    update: {},
    create: {
      name: 'Friday',
      input: '08:30',
      output: '17:00',
    },
  })
}
