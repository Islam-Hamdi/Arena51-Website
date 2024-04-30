import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@gmail.com",
      password: "admin",
      Admin: { create: [{}] },
    },
  });
  const FPS_cat = await prisma.Categories.create({
    data: {
      name: "FPS",
    },
  });
  const RPG_cat = await prisma.Categories.create({
    data: {
      name: "RPG",
    },
  });
  await prisma.user.create({
    data: {
      username: "Fatma",
      email: "fatma@gmail.com",
      password: "fatma123",
      Seller: {
        create: [
          {
            SellerGames: {
              create: [
                {
                  name: "Cyberpunk 2077",
                  image: "images/cyberPunk.webp",
                  description: "RPG game of the year 2024",
                  price: 60,
                  quantity: 5,
                  Categories_Games: {
                    create: [
                      {
                        categoriesId: FPS_cat.id,
                      },
                      {
                        categoriesId: RPG_cat.id,
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
  await prisma.user.create({
    data: {
      username: "islam",
      email: "islam@gmail.com",
      password: "islam01",
      Customer: { create: [{ balance: 1000 }] },
    },
  });
}
seed();
