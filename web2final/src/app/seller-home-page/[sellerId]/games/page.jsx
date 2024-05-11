import React from 'react'
import "@/app/seller-home-page/seller.css"
import GameWebsiteRepo from "@/app/repo/gamewebsite-repo";
import styles from "@/app/page.module.css";
import Image from 'next/image'
import Link from 'next/link'
export default async function page({ params }) {
    const games = await GameWebsiteRepo.getSellerGames(params.sellerId);
    return (
   
        <div className="games-wrapper " style={{ overflow: "hidden" }}>
        {games.map((e, index) => (
            <div key={e.id} className='games'>
                <div className='image-container'>
                    <Image className='banner-image' src={e.image} alt='' width={200} height={200} />
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
   
    )
}