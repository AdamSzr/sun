import "dotenv/config"
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/lib/prisma/generated/client'
import pg from 'pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seedowanie uprawnień start...')

  const godRole = await prisma.role.upsert({
    where: { name: 'GOD' },
    update: {},
    create: {
      name: 'GOD',
      description: 'Bóstwo z prawami do modyfikacji każdej struktury w aplikacji.',
    },
  })

  // Create an example explicit permission too
  const fullAccessPerm = await prisma.permission.upsert({
    where: { name: 'FULL_ACCESS' },
    update: {},
    create: {
      name: 'FULL_ACCESS',
      description: 'Zezwala na wykonanie dosłownie każdej możliwej operacji.',
    },
  })

  // get the first user
  const firstUser = await prisma.user.findFirst()
  if (firstUser) {
    await prisma.user.update({
      where: { id: firstUser.id },
      data: {
        roleId: godRole.id,
        permissions: {
          connect: [{ id: fullAccessPerm.id }]
        }
      },
    })
    console.log(`Sukces! Zaktualizowano użytkownika: [${firstUser.name}] do roli GOD oraz przydzielono mu FULL_ACCESS!`)
  } else {
    console.log('Brak użytkowników w bazie aby przypisać im rolę GOD. Zaloguj się by stworzyć usera, następnie odpal skrypt ponownie.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
