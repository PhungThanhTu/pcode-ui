import './App.css';
import { LoginPage } from './pages/LoginPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import { InDevelopment } from './pages/InDevelopment';
import { getAuth } from './selectors/auth.selector';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useLayoutEffect } from 'react';
import { fetchProfile } from './slices/auth.slice';

function App() {
	const { profile } = useSelector(getAuth);
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
				<Route path="/" element={<InDevelopment />} />
				<Route path="/login" element={!profile ? <LoginPage /> : <Navigate to="/" replace />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
