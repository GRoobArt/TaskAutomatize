import prisma from '../prisma'

export async function createBrand() {
  await prisma.brand.upsert({
    where: { name: 'MAUI' },
    update: {},
    create: {
      name: 'MAUI',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'RIP' },
    update: {},
    create: {
      name: 'RIP',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'VOLCOM' },
    update: {},
    create: {
      name: 'VOLCOM',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'RUSTY' },
    update: {},
    create: {
      name: 'RUSTY',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'PROSURF' },
    update: {},
    create: {
      name: 'PROSURF',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'GLOBE' },
    update: {},
    create: {
      name: 'GLOBE',
    },
  })
}
