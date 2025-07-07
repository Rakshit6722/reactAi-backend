import { v2 as cloudinary } from "cloudinary"
 
export const uploadImageVideo = async (file: Express.Multer.File, folderName: string): Promise<{
    url: string,
    publicId: string
}> => {
    try{
        const result = await cloudinary.uploader.upload(file.path, {
            folder: folderName,
            resource_type: "auto"
        })
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    }catch(err: any){
        throw new Error(`Failed to upload file: ${err.message}`)
    }
}