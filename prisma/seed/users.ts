import bcryptjs from 'bcryptjs'
import prisma from '../prisma'

export async function createUsers() {
  await prisma.user.upsert({
    where: { email: 'test.test@automacitetask.cl' },
    update: {},
    create: {
      name: 'test test',
      email: 'test.test@automacitetask.cl',
      password: await bcryptjs.hash('automacitetask', 10),
      role: 'ADMIN',
      work: 'JEFATURA',
      access: {
        connect: {
          name: 'ECOMMERCE',
        },
      },
    },
  })
}
