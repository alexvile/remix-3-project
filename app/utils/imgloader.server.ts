import cloudinary from "cloudinary";
import { writeAsyncIterableToWritable } from "@remix-run/node";


async function uploadImage(data: AsyncIterable<Uint8Array>) {
    const uploadPromise = new Promise(async (resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: "remixImages" },
            (error, result) => {
                if (error) {
                    reject(error)
                    return;
                }
                resolve(result)
            }
        )
        await writeAsyncIterableToWritable(data, uploadStream);
    });
        return uploadPromise;
}

export { uploadImage }