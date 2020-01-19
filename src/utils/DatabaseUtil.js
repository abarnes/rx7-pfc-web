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
export const getDriveByCode = (code, withDetails = false) => {
    return new Promise((resolve, reject) => { 
        const docRef = db.collection(DRIVES_COLLECTION).where("code", "==", code).limit(1);

        docRef.get().then(function(result) {
            if (result.docs.length) {
                const doc = result.docs[0];
                if (!withDetails) {
                    resolve(doc.data());
                } else {
                    db.collection(DRIVES_COLLECTION).doc(doc.id).collection(DATAPOINTS_SUBCOLLECTION).orderBy("time", "asc").get().then(function(docs) {
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

export const subscribeToDriveByCode = (code, callback) => {
    return new Promise((resolve, reject) => { 
        if (typeof code !== "string" || typeof callback !== "function") {
            reject("Invalid parameters provided");
        }

        const docRef = db.collection(DRIVES_COLLECTION).where("code", "==", code).limit(1);
        docRef.get().then(function(result) {
            if (result.docs.length) {
                subscribeToNewDatapointsForDrive(result.docs[0].id, callback);
                resolve();
            } else {
                reject("Document not found");
            }
        });
    
    });
}

function subscribeToNewDatapointsForDrive(driveId, callback) {
    if (!driveId || typeof callback !== "function") {
        return;
    }

    console.log("Now listening to drive " + driveId);
    db.collection(DRIVES_COLLECTION).doc(driveId).collection(DATAPOINTS_SUBCOLLECTION).orderBy("timestamp", "asc").onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                callback(change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified data: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed data: ", change.doc.data());
            }
        });
    });
}
