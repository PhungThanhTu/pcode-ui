import { LoginPage } from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { InDevelopmentPage } from './pages/InDevelopmentPage';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { fetchProfile } from './slices/auth.slice';
import ProtectedRoute from './router/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import CoursePage from './pages/CoursePage';

function App() {
	const dispatch = useDispatch();

	const fetchProfileAtStart = useCallback(() => {
		dispatch(fetchProfile());
	}, [dispatch]);

	useEffect(() => {
		fetchProfileAtStart();
	}, [fetchProfileAtStart]);
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<InDevelopmentPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/course" element={<CoursePage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="*" element={<InDevelopmentPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
