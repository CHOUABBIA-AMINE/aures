import { useLocation, useParams } 			from "react-router-dom";

const UserDetails = (props : any) => {
	const location 	= useLocation();
	const params 	= useParams();
	const action 	= params.action;
	console.log(location.state.modelId)
	return (
        <h1>{action}{location.state.modelId}</h1>
	);
}
export default UserDetails ;