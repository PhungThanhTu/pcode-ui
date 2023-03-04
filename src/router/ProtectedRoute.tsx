import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from '../selectors/auth.selector';
import Layout from '@/layouts/Layout';
import Loading from '@/pages/Loading';

const ProtectedRoute = () => {
	const { profile } = useSelector(getAuth);
	console.log(profile, "hello");

	if(profile){
		return <Layout> <Outlet /> </Layout> 
	}
	
	if (profile === undefined) {
		return <Loading/>
	}

	return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
