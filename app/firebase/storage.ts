import { getStorage, ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";
import firebaseApp from "./config"
import { FileModel } from "../models/File";

const storage = getStorage(firebaseApp);



export const getFiles = async (): Promise<FileModel[]> => {
    let files = [] as FileModel[];
    const storageRef = await ref(storage, "files");
    const result = await listAll(storageRef);
    for (let i=0; i<result.items.length; i++) {
        const item = result.items[i];
        files.push({
            fileName: item.name,
            downloadURL: await getDownloadURL(item)
        })
    }
    return files;
} 
export const addFile = async (file: File | null) => { 
    if (file) {
        const storageRef = ref(storage,`files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(`Upload progress: ${percent}`)
            },
            (err) => console.log(err),
            () => {
                console.log(`Upload successful!`)
            }
        );
    } else {
        console.log("Error, no file to upload");
    }
}
