document.addEventListener('DOMContentLoaded', function () {
    const currentUser = sessionStorage.getItem('username'); // Assuming you have stored the current user's username

    const purchaseHistory = JSON.parse(localStorage.getItem('purchases_history')) || [];
    if (purchaseHistory && currentUser) {
        const userPurchaseHistory = purchaseHistory.filter(purchase => purchase.buyer === currentUser);
        const purchaseHistoryTable = document.getElementById('salesTable');
        const viewHistory = userPurchaseHistory.map(purchase => displayHistory(purchase)).join('');
        purchaseHistoryTable.innerHTML = viewHistory;
         
    } 
    function displayHistory(purchase) {
        return `<tr>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Quantity</th>
        </tr>
        <tr>
            <td>${purchase.itemName}</td>
            <td>${purchase.price} $</td>
            <td>${purchase.quantity}</td>
        </tr>`
    }
})