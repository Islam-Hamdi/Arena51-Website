"use client"
import "./seller.css"
import React, { useState } from 'react';
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

const Seller = () => {
    const user = useUser();
    const router = useRouter();

    const [gameData, setGameData] = useState({
        title: '',
        caption: '',
        category: 'RPG',
        price: 0,
        quantity: 0,
        imageUrl: '', // Updated state for image URL
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGameData({ ...gameData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: gameData.title,
                description: gameData.caption,
                categories: gameData.category,
                price: gameData.price,
                quantity: gameData.quantity,
                sellerId: gameData.sellerId, // Include sellerId in payload
                user: user.user,
                image: gameData.imageUrl // Use the provided image URL
            };

            const response = await fetch("api/newGame", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to add game");
            }

            const data = await response.json();
            console.log("New game added:", data);

            router.push(`/seller-home-page/${user.user.userId}`);
        } catch (error) {
            console.error("Error adding game:", error);
        }
    };

    return (
        <main>
            <form id="gameForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Game Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="form-control"
                        value={gameData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="caption">Description</label>
                    <input
                        type="text"
                        name="caption"
                        id="caption"
                        className="form-control"
                        value={gameData.caption}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={gameData.category}
                        onChange={handleInputChange}
                    >
                        <option value="RPG">RPG</option>
                        <option value="FPS">FPS</option>
                        <option value="Fighting">Fighting</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                        min="0"
                        step="0.01"
                        value={gameData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="form-control"
                        min="0"
                        value={gameData.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="sellerId">Seller ID</label>
                    <input
                        type="text"
                        name="sellerId"
                        id="sellerId"
                        className="form-control"
                        value={gameData.sellerId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="url" name="imageUrl" id="imageUrl" className="form-control" value={gameData.imageUrl} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">
                        Upload Game
                    </button>
                </div>
            </form>

        </main>
    );
};

export default Seller;
