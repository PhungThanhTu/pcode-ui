import { LoginPage } from './pages/LoginPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { InDevelopmentPage } from './pages/InDevelopmentPage';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { fetchProfile } from './slices/auth.slice';
import ProtectedRoute from './router/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import CoursePage from './pages/CoursePage';
import CourseDialog from './components/CourseDialog';

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
					<Route index path="/" element={<Navigate to="/course" />} />
					<Route path="/course" element={<CoursePage />} />
					<Route path="/invitation/:code" element={<CourseDialog />} />
					<Route path="/profile" element={<ProfilePage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="*" element={<InDevelopmentPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
