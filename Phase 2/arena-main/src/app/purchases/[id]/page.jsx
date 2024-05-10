import "../purchases.css"
import prisma from '../../libs/prisma';



const PurchaseHistory = async ({ params }) => {
    // const user = useUser();
    // const [purchaseDetails, setPurchaseDetails] = useState(null);
    const { id } = params

    // useEffect(() => {
    //     const fetchPurchaseDetails = async () => {
    //         try {
    //             if (params && params.purchaseId) {
    //                 // Retrieve the purchase details from the database based on purchaseId
    //                 const purchaseDetail = await prisma.purchases.findUnique({
    //                     where: {
    //                         purchaseId: id
    //                     }
    //                 });
    //                 setPurchaseDetails(purchaseDetail);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching purchase details:', error);
    //         }
    //     };

    //     fetchPurchaseDetails();
    // }, [id]);

    const purchaseDetail = await prisma.purchases.findMany({ where: { purchaserId: id } });

    console.log("Purchase Details:🔴🔴🟢", purchaseDetail);


    return (
        <main style={{ maxWidth: "90%", margin: "0 auto", minHeight: "60vh" }}>
            <h1>Purchase History</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Zip Code</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody style={{ border: " 1px solid #777" }}>
                    {purchaseDetail.map((purchaseDetail, index) => (
                        <tr key={index}>
                            <td>{purchaseDetail.phone}</td>
                            <td>{purchaseDetail.address}</td>
                            <td>{purchaseDetail.zipcode}</td>
                            <td>{purchaseDetail.itemname}</td>
                            <td>{purchaseDetail.price}</td>
                            <td>{purchaseDetail.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default PurchaseHistory;
