import { useContext } from "react";
import { AuthContext } from "../../config/context/auth.context";



function Home() {
    const { user } = useContext(AuthContext);
	return (
        <div>
            Home Page {user?.username}
        </div>
	);
}
export default Home;