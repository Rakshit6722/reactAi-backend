import dotenv from 'dotenv'

dotenv.config()

export const config = {
    port: process.env.PORT,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    callback_url: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.JWT_SECRET,
    client_url: process.env.CLIENT_URL,
    resend_api_key:process.env.RESEND_API_KEY,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET,
    cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_folder_name:process.env.CLOUDINARY_FOLDER_NAME,
}