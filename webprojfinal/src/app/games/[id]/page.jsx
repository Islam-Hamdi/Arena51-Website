import Image from "next/image";
import { data } from "../../../../data/cardsData";
import "../games.css";
import "../../../app/components/home/hero/hero.css";
import Link from "next/link";
import prisma from "@/app/libs/prisma";

const GameDetails = async ({ params }) => {
  const { id } = params;

  const gameDetails = await prisma.game.findUnique({ where: { gameId: id } });

  if (!gameDetails) {
    return <p>Game not found.</p>;
  }


  // Fetching games with the same category
  const similarGames = await prisma.game.findMany({
    where: {
      categories: gameDetails.categories,
      NOT: {
        gameId: id,
      },
    },
  });

  if (!similarGames) {
    return <p>No More Games ound in This {gameDetails.categories}.</p>;
  }

  // const handleBuyNow = (gameId) => {
  //   if (user) {
  //     router.push(`/purchase/${gameId}`);
  //   } else {
  //     alert("User is not logged in");
  //   }
  // };



  return (
    <div className="game-details">
      <div className="game">
        <Image
          className="banner-image"
          src={gameDetails.image}
          alt=""
          width={1080}
          height={1080}
        />
        <div className="game-info">
          <h2>{gameDetails.name}</h2>
          <p>{gameDetails.description}</p>
          <p>Price: ${gameDetails.price}</p>
          <p>Quantity Available: {gameDetails.quantity}</p>
          <Link href={`/purchase/${gameDetails.gameId}`} passHref>
            <button className="btn fill">Buy Now</button>
          </Link>        
      </div>
      </div>
      <h3 className="heading">{`Other Games`}</h3>
      <p
        style={{
          borderTop: "5px solid #79e200",
          maxWidth: "400px",
          borderRadius: "20px",
        }}
      ></p>
      <div className="games-wrapper">
        {similarGames.map((e) => (
          <div key={e.id} className="games">
            <div className="image-container">
              <Image
                className="banner-image"
                src={e.image}
                alt=""
                width={1080}
                height={1080}
              />
            </div>
            <span className="price">${e.price}</span>
            <h2>{e.name}</h2>
            <p>{e.description}</p>
            <div className="button-wrapper">
              <Link href={`/games/${e.gameId}`} passHref style={{ marginRight: "10px" }}>
                <button className='btn outline'>Details</button>
              </Link>
              <Link href={`/purchase/${gameDetails.gameId}`} passHref>
                <button className="btn fill">Buy Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameDetails;
