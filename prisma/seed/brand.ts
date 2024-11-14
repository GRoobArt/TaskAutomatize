import prisma from '../prisma'

export async function createBrand() {
  await prisma.brand.upsert({
    where: { name: 'NOTION' },
    update: {},
    create: {
      name: 'NOTION',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'NEON' },
    update: {},
    create: {
      name: 'NEON',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'PRISMA' },
    update: {},
    create: {
      name: 'PRISMA',
    },
  })

  await prisma.brand.upsert({
    where: { name: 'STRAPI' },
    update: {},
    create: {
      name: 'STRAPI',
    },
  })
}
