import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/component/UserProfile";

function UserProfilePage() {
    return ( <>
    <Navbar>
        
    <h1 className="mx-auto text-xl">My Profile</h1>
        <UserProfile></UserProfile>
    </Navbar>
    </> );
}

export default UserProfilePage;