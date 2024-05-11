"use client"

import "./seller.css"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Seller = () => {
    // const limitedData = data.slice(0, 4);
    const [games, setGames] = useState([]);
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

    // const handleBuyNow = (gameId) => {
    //     if (user) {
    //         router.push(`/purchase/${gameId}`);
    //     } else {
    //         alert("User is not logged in");
    //     }
    // };

    return (
        <div className='seller__home'>
            <div>
                <h1 class="seller-title">Games You Are Selling</h1>
            </div>

            <div className="games-wrapper " style={{ overflow: "hidden" }}>
                {games.map((e, index) => (
                    <div key={e.id} className='games'>
                        <div className='image-container'>
                            <Image className='banner-image' src={e.image} alt='' width={1080} height={1080} />
                        </div>
                        <span className='price' >${e.price}</span>
                        <h2>{e.name}</h2>
                        <p>{e.description}</p>
                        <div className='button-wrapper' >
                            <Link href={`/games/${e.gameId}`} passHref style={{ marginRight: "10px" }}>
                                <button className='btn outline'>Details</button>
                            </Link>
                            {/* <button onClick={() => handleBuyNow(e.gameId)} className='btn fill'>Buy Now</button> */}
                        </div>
                    </div>
                ))
                }
            </div>
            <button id="sell-new-game-button" class="sell-new-game-btn" onClick={() => router.push('/seller')} >Sell New Game</button>
        </div>
    )
}

export default Seller