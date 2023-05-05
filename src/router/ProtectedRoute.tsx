import AppLayout from '@/layouts/AppLayout';
import { CirclePageLoading } from '@/components/Loading';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from '../selectors/auth.selector';

const ProtectedRoute = () => {
	const { profile } = useSelector(getAuth);

	if (profile) {
		return (
			<AppLayout>
				<Outlet />
			</AppLayout>
		);
	}

	if (profile === undefined) {
		return <CirclePageLoading />;
	}

	return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
