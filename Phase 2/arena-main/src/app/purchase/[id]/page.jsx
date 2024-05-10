"use client"
import React, { useState } from 'react';
import "../purchase.css";
import { useUser } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';

const PurchaseDetails = ({ params }) => {
    const { user, updateUserBalance } = useUser();
    const { id: gameId } = params; // Destructure and rename 'id' to 'gameId'
    const router = useRouter()

    const [quantity, setQuantity] = useState(1);
    const [itemname, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [zipcode, setZip] = useState('');


    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    };

    const handleItemPriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleZipChange = (e) => {
        setZip(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        function generatePurchaseId() {
            return (
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15)
            );
        }

        const totalCost = quantity * parseFloat(price);

        // Check if user has enough balance
        if (user.balance < totalCost) {
            alert('Insufficient balance');
            return;
        }

        const updatedBalance = user.balance - totalCost;

        // Prepare data for API submission
        const purchaseData = {
            gameId,
            purchaseId: generatePurchaseId(),
            quantity,
            itemname,
            price,
            phone,
            address,
            zipcode,
            purchaserId: user.userId,
        };


        try {
            const response = await fetch('/api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(purchaseData)
            });

            if (!response.ok) {
                throw new Error('Failed to confirm purchase');
            }



            // Handle successful purchase confirmation
            updateUserBalance(updatedBalance);
            alert('Purchase confirmed successfully!');
            router.push(`../purchases/${purchaseData.purchaserId}`)

        } catch (error) {
            console.error('Error confirming purchase:', error);
        }
    };

    return (
        <main>
            <div className="game-details">
                {/* Game details will be populated here */}
            </div>
            <div className="purchase-container">
                <h1 id="purchase-details" style={{ textAlign: "center" }}>Purchase Details</h1>
                <div id="item-details"></div>
                <form className="purchase-form" onSubmit={handleSubmit}>
                    <label htmlFor="itemname">Item Name:</label>
                    <input type="text" id="itemname" name="itemname" value={itemname} onChange={handleItemNameChange} required /><br />
                    <label htmlFor="itemPrice">Item Price:</label>
                    <input type="text" id="itemPrice" name="itemPrice" value={price} onChange={handleItemPriceChange} required /><br />
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={handleQuantityChange} required /><br />
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" value={phone} onChange={handlePhoneChange} required /><br />
                    <h2>Shipping Address</h2>
                    <label htmlFor="address">Address:</label>
                    <textarea id="address" name="address" value={address} onChange={handleAddressChange} required></textarea><br />
                    <label htmlFor="zip">Zip Code:</label>
                    <input type="text" id="zip" name="zip" value={zipcode} onChange={handleZipChange} required /><br />
                    <button id="confirm-purchase-btn" type="submit">Confirm Purchase</button>
                </form>
            </div>
        </main>
    );
};

export default PurchaseDetails;
