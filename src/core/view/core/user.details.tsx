import { useLocation, useParams } 			from "react-router-dom";

const UserDetails = (props : any) => {
	const location = useLocation();
	const params = useParams();
	const action = params.action;
	return (
        <h1>{action}{location.state.userId}</h1>
	);
}
export { UserDetails };