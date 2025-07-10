import axios from "axios"

export const convetToBase64 = async (url: string) => {
    const response = await axios.get(url,{
        responseType: "arraybuffer"
    })  

    return Buffer.from(response.data, "binary").toString("base64")
}