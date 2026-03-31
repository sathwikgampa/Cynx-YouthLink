import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const API_KEY = "AIzaSyCnShDV_1uquG8uYVBx1YU7aTBE3gCwO2E";

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "cnyx-24.firebaseapp.com",
    projectId: "cnyx-24",
    storageBucket: "cnyx-24.firebasestorage.app",
    messagingSenderId: "1071542594881",
    appId: "1:1071542594881:web:627854b1eb4054507e45c0",
    measurementId: "G-0629Y85KYL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function signUpUser(email, password) {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error.message);
    }
    return data; // returns localId (uid)
}

async function seed() {
    console.log("Starting Firebase seed process via REST API...");

    let createdStudents = 0;
    let createdMentors = 0;

    // Create 10 Students
    for (let i = 1; i <= 10; i++) {
        const email = `student${i}@youthlink.org`;
        const password = `StudentPass${i}!`;
        try {
            const userData = await signUpUser(email, password);
            await setDoc(doc(db, 'students', userData.localId), {
                email,
                role: 'student',
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Created Student: ${email} / ${password}`);
            createdStudents++;
        } catch (err) {
            if (err.message === 'EMAIL_EXISTS') {
                console.log(`⚠️ User already exists: ${email}`);
            } else {
                console.error(`❌ Failed to create Student ${email}:`, err.message);
            }
        }
    }

    // Create 10 Mentors
    for (let i = 1; i <= 10; i++) {
        const email = `mentor${i}@youthlink.org`;
        const password = `MentorPass${i}!`;
        try {
            const userData = await signUpUser(email, password);
            await setDoc(doc(db, 'mentors', userData.localId), {
                email,
                role: 'mentor',
                createdAt: new Date().toISOString()
            });
            console.log(`✅ Created Mentor: ${email} / ${password}`);
            createdMentors++;
        } catch (err) {
            if (err.message === 'EMAIL_EXISTS') {
                console.log(`⚠️ User already exists: ${email}`);
            } else {
                console.error(`❌ Failed to create Mentor ${email}:`, err.message);
            }
        }
    }

    console.log(`\n🎉 Seeding complete! Created ${createdStudents} students and ${createdMentors} mentors.`);
    process.exit(0);
}

seed();
