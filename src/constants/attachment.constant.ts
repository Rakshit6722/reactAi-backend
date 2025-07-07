export const ATTACHMENT_RESPONSE = {
    SUCCESS: {
        ATTACHMENT_CREATED: { message: "attachment create successfully", status: 201 }
    },
    ERROR: {
        FILE_NOT_PRESENT: { message: "file is required", status: 422 },
        CLOUDINARY_FILE_UPLOAD: { message: "error uploading file to cloudinary", status: 400 }
    }
}