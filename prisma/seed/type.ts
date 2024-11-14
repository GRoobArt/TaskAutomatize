import prisma from '../prisma'

export async function createtype() {
  await prisma.type.upsert({
    where: { name: 'CUSTOM' },
    update: {},
    create: {
      name: 'CUSTOM',
      form: 'custom',
      access: {
        connect: [
          { name: 'MARKETING' },
          { name: 'ECOMMERCE' },
          { name: 'MARKERPLACE' },
          { name: 'DESIGN' },
        ],
      },
    },
  })

  await prisma.type.upsert({
    where: { name: 'WEB' },
    update: {},
    create: {
      name: 'WEB',
      form: 'web',
      access: {
        connect: [{ name: 'ECOMMERCE' }, { name: 'DESIGN' }],
      },
    },
  })

  await prisma.type.upsert({
    where: { name: 'REDES' },
    update: {},
    create: {
      name: 'REDES',
      form: 'redes',
      access: {
        connect: [
          { name: 'MARKETING' },
          { name: 'ECOMMERCE' },
          { name: 'DESIGN' },
        ],
      },
    },
  })

  await prisma.type.upsert({
    where: { name: 'MAILING' },
    update: {},
    create: {
      name: 'MAILING',
      form: 'mailing',
      access: {
        connect: [
          { name: 'MARKETING' },
          { name: 'ECOMMERCE' },
          { name: 'DESIGN' },
        ],
      },
    },
  })
}
