export const validInvitationCode = new RegExp(/^(?!.*(.)(.*\1){2})[a-zA-Z\d]{5}$/);

export const ValidEmail = new RegExp(/\S+@\S+\.\S+/) 