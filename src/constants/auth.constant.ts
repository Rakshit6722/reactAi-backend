export const AUTH_CONSTANTS = {
    EMAIL_IN_USE: { message: "Email already in use", status: 409 },
    INVALID_CREDENTIALS: { message: "Invalid credentials", status: 401 },
    USER_NOT_FOUND: { message: "User not found", status: 404 },
    USER_CREATED: { message: "User created", status: 201 },
    LOGIN_SUCCESS: { message: "Login successful", status: 200 },
    UNAUTHORIZED: { message: "Unauthorized", status: 401 },
    JWT_SECRET_NOT_SET: { message: "JWT secret not set", status: 500 },
    EMAIL_SEND_FAILED: { message: "Failed to send reset email. Please try again later.", status: 500 },
    FORGOT_PASSWORD: {message:"Password reset link sent to your email.", status: 200 },
    RESET_PASSWORD: {message:"Password has been reset successfully.", status: 200 },
    LOGOUT_USER:{
        TOKEN_MISSING:{message:"Token not provided", status:422},
        LOGOUT_SUCCESSFUL:{message: "Logged out successfully." , status:200},
        LOGOUT_FAILED:{message: "Logout failed!"  , status:500},
    }
};