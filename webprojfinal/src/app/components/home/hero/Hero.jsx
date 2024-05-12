"use client"

import React, { useState, useEffect } from 'react';
import "./hero.css";
import Carousel from '../carousel/Carousel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';
const flashContainer = document.getElementById("flash-container");//like error msgs

function showFlashMessage(message, status) {
    flashContainer.textContent = message;
    flashContainer.style.display = "block";
    if (status === true) flashContainer.style.backgroundColor = "green";
    else flashContainer.style.backgroundColor = "#f44336";

    setTimeout(function () {
        flashContainer.style.display = "none";
    }, 3000); // Hide after 3 seconds
}

const Hero = () => {
  const [games, setGames] = useState([]);
  const user = useUser();


  const [activeCategory, setActiveCategory] = useState("All");
  const router = useRouter();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await fetch("api/gamesListings");
      if (response.ok) {
        const data = await response.json();
        setGames(data);
      } else {
        console.error("Failed to fetch games");
      }
    } catch (error) {
      console.error("An error occurred while fetching games:", error);
    }
  };

  // Extract unique categories
  const categories = ["All", "Fighting", "RPG", "FPS"];

  // Filter games based on the active category
  const filteredGames = activeCategory === "All" ? games : games.filter(game => game.categories === activeCategory);

  const handleBuyNow = (gameId, price) => {
    if (user && user.user && user.user.balance >= price) {
      router.push(`/purchase/${gameId}`);
    } else {
      showFlashMessage("User is not logged in or account balance is low. Please recharge.");
    }
  };

  return (
    <main>
      <div style={{
        maxWidth: "700px",
        margin: "0 auto"
      }}>
        <Carousel />
      </div>
      <div className="categories">
        {/* Create tabs for each category */}
        {categories.map(category => (
          <button
            key={category}
            className={`button-64 ${activeCategory === category ? 'active' : ''}`}
            role="button"
            onClick={() => setActiveCategory(category)}
          >
            <span className="text">{category}</span>
          </button>
        ))}
      </div>
      <div className="games-wrapper">
        {filteredGames.map((game, index) => (
          <div key={game.gameId} className='games'>
            <div className='image-container'>
              <Image className='banner-image' src={game.image} alt='' width={1080} height={1080} />
            </div>
            <span className='price'>${game.price}</span>
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <div className='button-wrapper' >
              <Link href={`/games/${game.gameId}`} passHref style={{ marginRight: "10px" }}>
                <button className='btn outline'>Details</button>
              </Link>
              <button onClick={() => handleBuyNow(game.gameId, game.price)} className='btn fill'>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Hero;
