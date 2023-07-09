export const notificationType = {
	SUCCESS: 'success',
	ERROR: 'error',
	WARNING: 'warning',
	INFO: 'info'
};
const notificationMessage = {
	ERROR: (props: string) => {
		return {
			message: props.toUpperCase(),
			type: notificationType.ERROR
		};
	},
	UPDATE_SUCCESS: (title: string, detail: string) => {
		return {
			message: `Update ${title ? title : ''} successfully! ${detail ? detail : ''}`.toUpperCase(),
			type: notificationType.SUCCESS
		};
	},
	UPDATE_FAIL: (title: string, detail: string) => {
		return {
			message: `Update ${title ? title : ''} fail! ${detail ? detail : ''}`.toUpperCase(),
			type: notificationType.ERROR
		};
	},
	CREATE_SUCCESS: (props: string) => {
		return {
			message: `Create ${props ? props : ''} successfully!`.toUpperCase(),
			type: notificationType.SUCCESS
		};
	},
	CREATE_FAIL: (title: string, detail: string) => {
		return {
			message: `Create ${title ? title : ''} fail! ${detail ? detail : ''}`.toUpperCase(),
			type: notificationType.ERROR
		};
	},
	DELETE_SUCCESS: (props: string) => {
		return {
			message: `Delete ${props ? props : ''} successfully!`.toUpperCase(),
			type: notificationType.SUCCESS
		};
	},
	DELETE_FAIL: (title: string, detail: string) => {
		return {
			message: `Delete ${title ? title : ''} fail! ${detail ? detail : ''} ,please try again!`.toUpperCase(),
			type: notificationType.ERROR
		};
	}
};
export default notificationMessage;
