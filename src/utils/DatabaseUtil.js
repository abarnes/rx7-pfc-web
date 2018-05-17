import firebase from "firebase/app";
import 'firebase/firestore';
import { config as firebaseConfig } from "@/config/FirebaseConfig";

// Initial Configuration
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const DRIVES_COLLECTION = "drives";
const DATAPOINTS_SUBCOLLECTION = "datapoints";


// Public methods
export const getDriveById = (id, withDetails = false) => {
    return new Promise((resolve, reject) => { 
        const docRef = db.collection(DRIVES_COLLECTION).doc(id);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                if (!withDetails) {
                    resolve(doc.data());
                } else {
                    docRef.collection(DATAPOINTS_SUBCOLLECTION).get().then(function(docs) {
                        resolve({drive: doc.data(), dataQuerySnapshot: docs});
                    }).catch(function(error) {
                        reject(error);
                    }); 
                }
            } else {
                reject("Document not found");
            }
        }).catch(function(error) {
            reject(error);
        });
    });
}

export const getDriveByCode = (id) => {
    
}



