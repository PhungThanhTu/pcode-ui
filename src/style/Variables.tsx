export const borderColor = 'rgb(225,227,230)';
export const borderRadius = '5px';
export const componentsBoxColor = '#FAFAFA';

export const componentStyle = {
	borderRadius: borderRadius,
	backgroundColor: componentsBoxColor,
	padding: '0.4rem'
};
export const centerPos = {
	textAlign: 'center',
	display: 'block',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%)'
};
export const flexBox = (alignItems: string, justifyContent: string, flexDirection: string) => {
	return {
		display: 'flex',
		flexDirection: flexDirection,
		alignItems: alignItems,
		justifyContent: justifyContent,
		height: '100%'
	};
};
