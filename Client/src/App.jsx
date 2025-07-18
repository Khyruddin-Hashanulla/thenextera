import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Courses from './Pages/Courses';
import CreateCourse from './Pages/CreateCourse';
import EditCourse from './Pages/EditCourse';
import CourseView from './Pages/CourseView';
import EmailVerification from './Pages/EmailVerification';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import RoleUpdate from './Pages/RoleUpdate';

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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/role-update" element={<RoleUpdate />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <Courses />
              </PrivateRoute>
            }
          />

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

          <Route
            path="/courses/:courseId"
            element={
              <PrivateRoute>
                <CourseView />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;