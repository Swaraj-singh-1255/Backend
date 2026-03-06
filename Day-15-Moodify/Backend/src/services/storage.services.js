const ImageKit = require('@imagekit/nodejs').default

ImageKit.toFile = async (buffer, filename) => {
    return new File([buffer], filename, { type: 'application/octet-stream' })
}


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile({ buffer, filename, folder = ""}){
    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: filename,
        folder
    })

    return file
}


module.exports = {uploadFile}