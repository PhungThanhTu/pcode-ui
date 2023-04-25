export interface Snackbar {
	type: string;
	message: string;
}

// loading for actions
export interface Loading {
	isLoading: boolean;
}

export interface TabElement {
	title: string;
	element: JSX.Element;
}
