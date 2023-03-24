import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from '../selectors/auth.selector';
import Layout from '@/layouts/Layout';
import LoadingPage from '@/pages/LoadingPage';

const ProtectedRoute = () => {
	const { profile } = useSelector(getAuth);

	if (profile) {
		return (
			<Layout>
				<Outlet />
			</Layout>
		);
	}

	if (profile === undefined) {
		return <LoadingPage />;
	}

	return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
