import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const gamesPath = path.join(process.cwd(), 'app/data/games.json')
const categoriesPath = path.join(process.cwd(), 'app/data/categories.json')
const usersPath = path.join(process.cwd(), 'app/data/users.json')

async function seed() {
    try {
        // Read JSON files
        const users = await fs.readJSON(usersPath)
        const games = await fs.readJSON(gamesPath)
        const categories = await fs.readJSON(categoriesPath)

        
        // Create games
// Create games
for (const game of games) {
  await prisma.game.create({ 
      data: {
          ...game,
          seller: {
              connect: { userId: game.sellerId } // Connect the game to its seller
          }
      }
  });
}
// Iterate over users and create each user
for (const user of users) {
  // Remove the id field from the user data
  const { id, ...userData } = user;
  await prisma.user.create({ data: userData });
}

        // Create categories
        for (const category of categories) {
            await prisma.category.create({ data: category });
        }

        console.log('Successfully seeded');
    } catch (error) {
        console.log(error);
        return { error: error.message }
    } 
}

await seed();
