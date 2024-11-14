import prisma from '../prisma'

export async function createAccess() {
  await prisma.access.upsert({
    where: { name: 'ECOMMERCE' },
    update: {},
    create: {
      name: 'ECOMMERCE',
    },
  })

  await prisma.access.upsert({
    where: { name: 'MARKETING' },
    update: {},
    create: {
      name: 'MARKETING',
    },
  })

  await prisma.access.upsert({
    where: { name: 'HELPER' },
    update: {},
    create: {
      name: 'HELPER',
    },
  })

  await prisma.access.upsert({
    where: { name: 'MARKERPLACE' },
    update: {},
    create: {
      name: 'MARKERPLACE',
    },
  })

  await prisma.access.upsert({
    where: { name: 'PROYECTO' },
    update: {},
    create: {
      name: 'PROYECTO',
    },
  })

  await prisma.access.upsert({
    where: { name: 'BODEGA' },
    update: {},
    create: {
      name: 'BODEGA',
    },
  })

  await prisma.access.upsert({
    where: { name: 'DESIGN' },
    update: {},
    create: {
      name: 'DESIGN',
    },
  })
}
