import { v2 as cloudinary } from 'cloudinary'
import { config } from './env';


export const cloudinaryConnect = () => {
    cloudinary.config({
        cloud_name: config.cloudinary_cloud_name,
        api_key: config.cloudinary_api_key,
        api_secret: config.cloudinary_api_secret
    });
}