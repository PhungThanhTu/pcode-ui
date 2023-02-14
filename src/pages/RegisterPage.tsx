import AuthPageLayout from '../layouts/AuthPageLayout';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage = () => {
	return (
		<AuthPageLayout>
			<RegisterForm />
		</AuthPageLayout>
	);
};
