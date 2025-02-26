import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/component/UserOrders";

function UserOrdersPage() {
    return ( 
        <>
        <Navbar>    
        <h1 className="mx-auto text-xl">My Order</h1>
        <UserOrders></UserOrders>
        </Navbar>
        
        
        </>
     );
}

export default UserOrdersPage;