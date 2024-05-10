import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const gamesPath = path.join(process.cwd(), "data/games.json");
const usersPath = path.join(process.cwd(), "data/users.json");

const CATEGORY_DELIMITER = ",";

async function seed() {
  try {
    // Read JSON files
    const games = await fs.readJSON(gamesPath);
    const users = await fs.readJSON(usersPath);

    // Iterate over users and create each user
    for (const user of users) {
      // Create the user
      const createdUser = await prisma.user.create({
        data: user,
      });

      // Iterate over user's games and create each game
      for (const game of games) {
        if (game.sellerId === createdUser.userId) {
          const { categories: categoriesString, sellerId, ...gameData } = game;
          const categoriesArray = categoriesString.split(CATEGORY_DELIMITER);
          const categoriesStringForPrisma =
            categoriesArray.join(CATEGORY_DELIMITER);

          // Create the game and connect it to the user
          await prisma.game.create({
            data: {
              ...gameData,
              seller: {
                connect: { userId: createdUser.userId },
              },
              categories: categoriesStringForPrisma,
            },
          });
        }
      }
    }

    console.log("Successfully seeded");
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
