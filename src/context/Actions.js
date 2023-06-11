export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccessfull = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
});