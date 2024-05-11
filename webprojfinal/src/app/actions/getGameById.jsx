import prisma from "../libs/prisma";

export default async function getGameById(params) {
    try {
        const { gameId } = params;
        if (!gameId) {
            throw new Error('gameId is missing');
        }
        const game = await prisma.game.findUnique({
            where: {
                id: gameId
            },
        })
        if (!game) {
            return null;
        }

        return {
            ...game,
        }
    } catch (error) {
        throw new Error(error);
    }
}
