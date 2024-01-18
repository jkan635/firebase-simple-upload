import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import firebaseApp from "./config"

const db = getFirestore(firebaseApp);

export const getTextRecords = async (): Promise<string[]> => {
    let records = [] as string[];
    await getDocs(collection(db, "textRecords")).then((querySnapshot) => {
         records = querySnapshot.docs.map((doc) => {
            return doc.data().text
        }
        );
    })
    return records;
} 
export const addTextRecord = async (text: string) => {   
    try {
        const docRef = await addDoc(collection(db, "textRecords"), {
          text: text,    
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}
