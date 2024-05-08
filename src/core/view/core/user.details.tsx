import { useLocation, useParams } 			from "react-router-dom";

const UserDetails  = (props : any) => {
	const location = useLocation();
	const params   = useParams();
	const action   = params.action;
	console.log(location.state.userId);
	return (
        <h1>{action}</h1>
	);
}
export { UserDetails };