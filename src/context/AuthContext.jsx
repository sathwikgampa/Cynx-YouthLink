import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch custom role from Firestore - Check Students Collection First
        const studentDocRef = doc(db, 'students', user.uid);
        const studentDoc = await getDoc(studentDocRef);
        
        if (studentDoc.exists()) {
          setUserRole(studentDoc.data().role || 'student');
        } else {
          // Fallback to Mentors Collection
          const mentorDocRef = doc(db, 'mentors', user.uid);
          const mentorDoc = await getDoc(mentorDocRef);
          
          if (mentorDoc.exists()) {
            setUserRole(mentorDoc.data().role || 'mentor');
          } else {
            // Orphaned Account (No stored metadata)
            setUserRole(null);
          }
        }
      } else {
        setUserRole(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    setUserRole // Exported to easily switch state during demo without full DB ops
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
