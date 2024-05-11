import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class GameWebsiteRepo {
    async getSellerGames(sellerId) {
        try {
            return prisma.game.findMany({
                where: { sellerId: sellerId }
            })
        } catch (error) {
            return { error: error.message }
        }
    }
}

export default new GameWebsiteRepo()