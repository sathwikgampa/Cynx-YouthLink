import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MoodSelector from './components/MoodSelector';
import ChatRoom from './components/ChatRoom';
import GroupLobby from './components/GroupLobby';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import UserDashboard from './components/dashboard/UserDashboard';
import MentorDashboard from './components/MentorDashboard';
import { generatePseudonym } from './utils/helpers';
import { useState, useEffect } from 'react';

function AppRoutes() {
  const { currentUser, userRole } = useAuth();
  const [guestUser, setGuestUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      setGuestUser(JSON.parse(savedUser));
    } else {
      const newUser = generatePseudonym();
      localStorage.setItem('chatUser', JSON.stringify(newUser));
      setGuestUser(newUser);
    }
  }, []);

  if (!guestUser) return null;

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      
      {/* Protected Routes */}
      <Route 
        path="/youth" 
        element={currentUser ? <UserDashboard /> : <Navigate to="/login" />} 
      >
        {/* Nested Chat Routes so UserDashboard acts as Layout */}
        <Route path="moods" element={<MoodSelector />} />
        <Route path="lobby/:mood" element={<GroupLobby />} />
        <Route path="chat/:roomId" element={<ChatRoom user={guestUser} />} />
      </Route>
      <Route 
        path="/mentor" 
        element={currentUser ? <MentorDashboard /> : <Navigate to="/login" />} 
      />
      
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
