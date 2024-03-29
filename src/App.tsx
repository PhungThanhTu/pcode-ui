import { LoginPage } from './pages/LoginPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { InDevelopmentPage } from './pages/InDevelopmentPage';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { fetchProfile } from './slices/auth.slice';
import ProtectedRoute from './router/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import CoursesPage from './pages/CoursesPage';
import CourseDialog from './components/Course/CourseJoinDialog';
import CoursePage from './pages/CoursePage';
import DocumentPage from './pages/DocumentPage';
import { getHistory } from './selectors/config.selector';
import { ResetPage } from './pages/ResetPage';

function App() {

	const dispatch = useDispatch();
	const history = useSelector(getHistory)

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
					<Route index path="/" element={<Navigate to={history ? history.length > 0 ? `/${history}` : "/course" : "/course"} />} />
					<Route path="/course" element={<CoursesPage />} />
					<Route path="/course/:id" element={<CoursePage />} />
					<Route path="/invitation/:code" element={<CourseDialog />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/course/:id/:documentId" element={<DocumentPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/reset/:token?" element={<ResetPage />} />
				<Route path="*" element={<InDevelopmentPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
