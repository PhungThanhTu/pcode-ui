export interface Snackbar {
	type: string;
	message: string;
}

export interface Loading {
	isLoading: boolean;
}

export interface TabElement {
	title: string;
	element: JSX.Element;
}
