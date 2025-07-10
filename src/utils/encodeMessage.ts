export const encodeMessageToBase64Url = (mimeMessage: string): string => {
    const base64Encoded = Buffer.from(mimeMessage)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')

    return base64Encoded
}