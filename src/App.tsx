import { LoginPage } from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { InDevelopmentPage } from './pages/InDevelopmentPage';
import { useDispatch } from 'react-redux';
import { useCallback, useLayoutEffect } from 'react';
import { fetchProfile } from './slices/auth.slice';
import ProtectedRoute from './router/ProtectedRoute';

function App() {
	const dispatch = useDispatch();

	const fetchProfileAtStart = useCallback(() => {
		dispatch(fetchProfile());
	}, [dispatch]);

	useLayoutEffect(() => {
		fetchProfileAtStart();
	}, [fetchProfileAtStart]);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<InDevelopmentPage />
						</ProtectedRoute>
					}
				/>

				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
