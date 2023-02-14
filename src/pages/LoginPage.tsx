import AuthPageLayout from '../layouts/AuthPageLayout';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
	return (
		<AuthPageLayout>
			<LoginForm />
		</AuthPageLayout>
	);
};
