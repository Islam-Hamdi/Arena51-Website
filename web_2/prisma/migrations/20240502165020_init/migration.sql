-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "password" TEXT NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'Customer',
    "balance" REAL NOT NULL DEFAULT 0.00
);

-- CreateTable
CREATE TABLE "Game" (
    "gameId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "categories" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    CONSTRAINT "Game_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
