import AppLayout from '@/layouts/AppLayout';
import { CirclePageLoading } from '@/components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getAuth } from '../selectors/auth.selector';
import { useEffect } from 'react';
import { setHistory } from '@/slices/config.slice';

const ProtectedRoute = () => {

	const { profile } = useSelector(getAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (window.location.href && !profile) {

			dispatch(setHistory({ url: window.location.href.slice(window.location.href.indexOf(window.location.host) + window.location.host.length + 1) }))
		}
	}, [])

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
