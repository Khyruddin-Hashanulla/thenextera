import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Home from './Pages/Home'; // Import the new Home component
import Login from './Pages/Login';
import Register from './Pages/Register';
import VerifyOTP from './Pages/VerifyOTP';
import Dashboard from './Pages/Dashboard';
import Courses from './Pages/Courses';
import CreateCourse from './Pages/CreateCourse';
import EditCourse from './Pages/EditCourse';
import CourseView from './Pages/CourseView';
import AdminPanel from './Pages/AdminPanel';
import CoreSubjects from './Pages/CoreSubjects';
import SubjectDetail from './Pages/SubjectDetail';
import TopicDetailModular from './Pages/TopicDetailModular';
import AdminSubjects from './Pages/AdminSubjects';
import DSASheet from './Pages/DSASheet';
import AdminDSA from './Pages/AdminDSA';
import DSABookmarks from './Pages/DSABookmarks';
import CodeEditor from './Pages/CodeEditor';
import EmailVerification from './Pages/EmailVerification';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import RoleUpdate from './Pages/RoleUpdate';
import AuthSuccess from './Pages/AuthSuccess';
import Profile from './Pages/Profile';
import InstructorPanel from './Pages/InstructorPanel';
// Footer page imports
import About from './Pages/About';
import Contact from './Pages/Contact';
import Help from './Pages/Help';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import Careers from './Pages/Careers';
import Blog from './Pages/Blog';
import Community from './Pages/Community';

// Route protection components
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

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  return children;
};

const InstructorOrAdminRoute = ({ children }) => {
  const { user, isInstructor, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!isInstructor && !isAdmin) return <Navigate to="/dashboard" />;
  return children;
};

// Main App Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Set the Home component as the root route */}
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/api/auth/success" element={<AuthSuccess />} />
      <Route path="/verify-email/:token" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/role-update" element={<RoleUpdate />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      
      {/* Footer Pages - Public Routes */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/help" element={<Help />} />
      <Route path="/community" element={<Community />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      
      {/* Profile Route - Private Route */}
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />
      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route 
        path="/core-subjects" 
        element={
          <PrivateRoute>
            <CoreSubjects />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/core-subject" 
        element={
          <PrivateRoute>
            <CoreSubjects />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/subject/:subjectId" 
        element={
          <PrivateRoute>
            <SubjectDetail />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/subject/:subjectId/topic/:topicId" 
        element={
          <PrivateRoute>
            <TopicDetailModular />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/subject/:subjectId/topic/:topicId/subtopic/:subtopicId" 
        element={
          <PrivateRoute>
            <TopicDetailModular />
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
        path="/admin"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/subjects"
        element={
          <AdminRoute>
            <AdminSubjects />
          </AdminRoute>
        }
      />

      <Route
        path="/dsa-sheet"
        element={
          <PrivateRoute>
            <DSASheet />
          </PrivateRoute>
        }
      />

      <Route
        path="/dsa-bookmarks"
        element={
          <PrivateRoute>
            <DSABookmarks />
          </PrivateRoute>
        }
      />

      <Route
        path="/code-editor"
        element={<CodeEditor />}
      />

      <Route
        path="/admin/dsa"
        element={
          <AdminRoute>
            <AdminDSA />
          </AdminRoute>
        }
      />

      <Route
        path="/dsa-management"
        element={
          <InstructorOrAdminRoute>
            <AdminDSA />
          </InstructorOrAdminRoute>
        }
      />

      <Route
        path="/instructor-panel"
        element={
          <InstructorRoute>
            <InstructorPanel />
          </InstructorRoute>
        }
      />

      <Route path="/courses/:courseId" element={<CourseView />} />
    </Routes>
  );
};

// Main App component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force loading screen to show every time for testing
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

// Add a browser router component to handle OAuth callbacks
function HashRouteHandler() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export { HashRouteHandler };
export default App;