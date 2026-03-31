import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

const testFirebase = async () => {
    try {
        await addDoc(collection(db, "messages"), {
            text: "Hello from app",
            sender: "User_123",
            timestamp: Date.now()
        });
        console.log("✅ Message sent");
    } catch (error) {
        console.error("❌ Error:", error);
    }
};

// Call the function
testFirebase();