import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../selectors/auth.selector';

const ProtectedRoute = ({ children }: any) => {
	const { profile } = useSelector(getAuth);

	if (!profile) return <Navigate to="/login" replace />;

	return <> {children} </>;
};

export default ProtectedRoute;
