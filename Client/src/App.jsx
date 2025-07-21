import { BrowserRouter as Router, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './Pages/Home'; // Import the new Home component
import Login from './Pages/Login';
import Register from './Pages/Register';
import VerifyOTP from './Pages/VerifyOTP';
import Dashboard from './Pages/Dashboard';
import Courses from './Pages/Courses';
import CreateCourse from './Pages/CreateCourse';
import EditCourse from './Pages/EditCourse';
import CourseView from './Pages/CourseView';
import EmailVerification from './Pages/EmailVerification';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import RoleUpdate from './Pages/RoleUpdate';
import AuthSuccess from './Pages/AuthSuccess';
import TestPage from './Pages/TestPage';

// Define these components inside the App component
function App() {
  const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
  };

  const InstructorRoute = ({ children }) => {
    const { user, isInstructor } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (!isInstructor) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Set the Home component as the root route */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/role-update" element={<RoleUpdate />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          
          <Route
            path="/courses/create"
            element={
              <InstructorRoute>
                <CreateCourse />
              </InstructorRoute>
            }
          />

          <Route
            path="/courses/edit/:courseId"
            element={
              <InstructorRoute>
                <EditCourse />
              </InstructorRoute>
            }
          />

          <Route path="/courses/:courseId" element={<CourseView />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Add a hash router component to handle OAuth callbacks
function HashRouteHandler() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export { HashRouteHandler };
export default App;