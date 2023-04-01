import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from '../selectors/auth.selector';
import Layout from '@/layouts/Layout';
import { CirclePageLoading } from '@/components/Loading';

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
		return <CirclePageLoading />;
	}

	return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
