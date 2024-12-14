import { storage } from "../config/firebase.js";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
// import {v4} from "uuid";

const uploadImage = async (file) =>{
    const dateTime = Date.now();
    const fileName= `shops_images/${dateTime}`;
    const storageRef = ref(storage, fileName);
    const metadata = {
        contentType: file.mimetype
    }
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

export {uploadImage};

