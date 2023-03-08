
export const notificationType = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: 'info'
}
const notificationMessage = {
    ERROR: (props: String) => {
        return {
            message: props,
            type: notificationType.ERROR
        }
    },
    UPDATE_SUCCESS: (title: String, detail: String) => {
        return {
            message: `Update ${title ? title : ""} successfully! ${detail ? detail : ""}`,
            type: notificationType.SUCCESS
        }
    },
    UPDATE_FAIL: (title: String, detail: String) => {
        return {
            message: `Update ${title ? title : ""} fail! ${detail ? detail : ""}`,
            type: notificationType.ERROR
        }
    },
    CREATE_SUCCESS: (props: String) => {
        return {
            message: `Create ${props ? props : ""} successfully!`,
            type: notificationType.SUCCESS
        }
    },
    CREATE_FAIL: (title: String, detail: String) => {
        return {
            message: `Create ${title ? title : ""} fail! ${detail ? detail : ""}`,
            type: notificationType.ERROR
        }
    },
    DELETE_SUCCESS: (props: String) => {
        return {
            message: `Delete ${props ? props : ""} successfully!`,
            type: notificationType.SUCCESS
        }
    },
    DELETE_FAIL: (title: String, detail: string) => {
        return {
            message: `Delete ${title ? title : ""} fail! ${detail ? detail : ""}`,
            type: notificationType.ERROR
        }
    }
}
export default notificationMessage