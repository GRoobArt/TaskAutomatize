import prisma from './prisma'

import { createUsers } from './seed/users'
import { createAccess } from './seed/access'
import { createBrand } from './seed/brand'
import { createSchedule } from './seed/schedule'
import { createtype } from './seed/type'

async function main() {
  await createAccess()
  await createUsers()
  await createBrand()
  await createSchedule()
  await createtype()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
