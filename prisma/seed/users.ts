import bcryptjs from 'bcryptjs'
import prisma from '../prisma'

export async function createUsers() {
  await prisma.user.upsert({
    where: { email: 'robert.garcia@mauiandsons.cl' },
    update: {},
    create: {
      name: 'robert garcia',
      email: 'robert.garcia@mauiandsons.cl',
      password: await bcryptjs.hash('Robert.2020', 10),
      role: 'ADMIN',
      work: 'JEFATURA',
      access: {
        connect: {
          name: 'ECOMMERCE',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'ignacio.fernandez@mauiandsons.cl' },
    update: {},
    create: {
      name: 'ignacio fernandez',
      email: 'ignacio.fernandez@mauiandsons.cl',
      password: await bcryptjs.hash('ignacio.fernandez', 10),
      work: 'GERENCIA',
      access: {
        connect: {
          name: 'ECOMMERCE',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'sebastian.alvarez@mauiandsons.cl' },
    update: {},
    create: {
      name: 'sebastian alvarez',
      email: 'sebastian.alvarez@mauiandsons.cl',
      password: await bcryptjs.hash('sebastian.alvarez', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'MARKERPLACE',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'valentina.gomez@mauiandsons.cl' },
    update: {},
    create: {
      name: 'valentina gomez',
      email: 'valentina.gomez@mauiandsons.cl',
      password: await bcryptjs.hash('valentina.gomez', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'MARKERPLACE',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'belen.galvez@mauiandsons.cl' },
    update: {},
    create: {
      name: 'belen galvez',
      email: 'belen.galvez@mauiandsons.cl',
      password: await bcryptjs.hash('belen.galvez', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'MARKERPLACE',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'mauricio.escobedo@mauiandsons.cl' },
    update: {},
    create: {
      name: 'mauricio escobedo',
      email: 'mauricio.escobedo@mauiandsons.cl',
      password: await bcryptjs.hash('mauricio.escobedo', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'ECOMMERCE',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'karen.rojas@mauiandsons.cl' },
    update: {},
    create: {
      name: 'karen rojas',
      email: 'karen.rojas@mauiandsons.cl',
      password: await bcryptjs.hash('karen.rojas', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'ECOMMERCE',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'macarena.torres@mauiandsons.cl' },
    update: {},
    create: {
      name: 'macarena torres',
      email: 'macarena.torres@mauiandsons.cl',
      password: await bcryptjs.hash('macarena.torres', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'MARKETING',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'daniela.oyarzun@mauiandsons.cl' },
    update: {},
    create: {
      name: 'daniela oyarzun',
      email: 'daniela.oyarzun@mauiandsons.cl',
      password: await bcryptjs.hash('daniela.oyarzun', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'MARKETING',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'wilmary.vasquez@mauiandsons.cl' },
    update: {},
    create: {
      name: 'wilmary vasquez',
      email: 'wilmary.vasquez@mauiandsons.cl',
      password: await bcryptjs.hash('wilmary.vasquez', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'DESIGN',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'vileidy.munoz@mauiandsons.cl' },
    update: {},
    create: {
      name: 'vileidy munoz',
      email: 'vileidy.munoz@mauiandsons.cl',
      password: await bcryptjs.hash('vileidy.munoz', 10),
      work: 'OPERARIO',
      access: {
        connect: {
          name: 'DESIGN',
        },
      },
    },
  })
}
