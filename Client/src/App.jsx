import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState, useEffect, lazy, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';
import YouTubeSubscriptionPopup from './components/YouTubeSubscriptionPopup';

// Import Dashboard directly to fix black screen issue
import Dashboard from './Pages/Dashboard';

// Lazy load other components for better performance
const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./Pages/Login'));
const Register = lazy(() => import('./Pages/Register'));
const VerifyOTP = lazy(() => import('./Pages/VerifyOTP'));
const Courses = lazy(() => import('./Pages/Courses'));
const CreateCourse = lazy(() => import('./Pages/CreateCourse'));
const EditCourse = lazy(() => import('./Pages/EditCourse'));
const CourseView = lazy(() => import('./Pages/CourseView'));
const AdminPanel = lazy(() => import('./Pages/AdminPanel'));
const CoreSubjects = lazy(() => import('./Pages/CoreSubjects'));
const SubjectDetail = lazy(() => import('./Pages/SubjectDetail'));
const TopicDetailModular = lazy(() => import('./Pages/TopicDetailModular'));
const AdminSubjects = lazy(() => import('./Pages/AdminSubjects'));
const DSASheet = lazy(() => import('./Pages/DSASheet'));
const AdminDSA = lazy(() => import('./Pages/AdminDSA'));
const DSABookmarks = lazy(() => import('./Pages/DSABookmarks'));
const CodeEditor = lazy(() => import('./Pages/CodeEditor'));
const EmailVerification = lazy(() => import('./Pages/EmailVerification'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./Pages/ResetPassword'));
const RoleUpdate = lazy(() => import('./Pages/RoleUpdate'));
const AuthSuccess = lazy(() => import('./Pages/AuthSuccess'));
const Profile = lazy(() => import('./Pages/Profile'));
const InstructorPanel = lazy(() => import('./Pages/InstructorPanel'));
// Footer page imports - lazy loaded
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const Help = lazy(() => import('./Pages/Help'));
const Privacy = lazy(() => import('./Pages/Privacy'));
const Terms = lazy(() => import('./Pages/Terms'));
const Careers = lazy(() => import('./Pages/Careers'));
const Blog = lazy(() => import('./Pages/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const Community = lazy(() => import('./Pages/Community'));

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
      <Route path="/" element={
        <Suspense fallback={<LoadingScreen />}>
          <Home />
        </Suspense>
      } />
      <Route path="/Home" element={
        <Suspense fallback={<LoadingScreen />}>
          <Home />
        </Suspense>
      } />
      
      <Route path="/login" element={
        <Suspense fallback={<LoadingScreen />}>
          <Login />
        </Suspense>
      } />
      <Route path="/register" element={
        <Suspense fallback={<LoadingScreen />}>
          <Register />
        </Suspense>
      } />
      <Route path="/api/auth/success" element={
        <Suspense fallback={<LoadingScreen />}>
          <AuthSuccess />
        </Suspense>
      } />
      <Route path="/verify-email/:token" element={
        <Suspense fallback={<LoadingScreen />}>
          <EmailVerification />
        </Suspense>
      } />
      <Route path="/forgot-password" element={
        <Suspense fallback={<LoadingScreen />}>
          <ForgotPassword />
        </Suspense>
      } />
      <Route path="/reset-password/:token" element={
        <Suspense fallback={<LoadingScreen />}>
          <ResetPassword />
        </Suspense>
      } />
      <Route path="/role-update" element={
        <Suspense fallback={<LoadingScreen />}>
          <RoleUpdate />
        </Suspense>
      } />
      <Route path="/verify-otp" element={
        <Suspense fallback={<LoadingScreen />}>
          <VerifyOTP />
        </Suspense>
      } />
      
      {/* Footer Pages - Public Routes */}
      <Route path="/about" element={
        <Suspense fallback={<LoadingScreen />}>
          <About />
        </Suspense>
      } />
      <Route path="/contact" element={
        <Suspense fallback={<LoadingScreen />}>
          <Contact />
        </Suspense>
      } />
      <Route path="/careers" element={
        <Suspense fallback={<LoadingScreen />}>
          <Careers />
        </Suspense>
      } />
      <Route path="/blog" element={
        <Suspense fallback={<LoadingScreen />}>
          <Blog />
        </Suspense>
      } />
      {/* Individual Blog Post Route */}
      <Route path="/blog/:slug" element={
        <Suspense fallback={<LoadingScreen />}>
          <BlogPost />
        </Suspense>
      } />
      <Route path="/help" element={
        <Suspense fallback={<LoadingScreen />}>
          <Help />
        </Suspense>
      } />
      <Route path="/community" element={
        <Suspense fallback={<LoadingScreen />}>
          <Community />
        </Suspense>
      } />
      <Route path="/privacy" element={
        <Suspense fallback={<LoadingScreen />}>
          <Privacy />
        </Suspense>
      } />
      <Route path="/terms" element={
        <Suspense fallback={<LoadingScreen />}>
          <Terms />
        </Suspense>
      } />
      
      {/* Profile Route - Private Route */}
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingScreen />}>
              <Profile />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/courses" element={
        <PrivateRoute>
          <Suspense fallback={<LoadingScreen />}>
            <Courses />
          </Suspense>
        </PrivateRoute>
      } />
      <Route 
        path="/core-subjects" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingScreen />}>
              <CoreSubjects />
            </Suspense>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/core-subject" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingScreen />}>
              <CoreSubjects />
            </Suspense>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/subject/:subjectId" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingScreen />}>
              <SubjectDetail />
            </Suspense>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/subject/:subjectId/topic/:topicId" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingScreen />}>
              <TopicDetailModular />
            </Suspense>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/subject/:subjectId/topic/:topicId/subtopic/:subtopicId" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingScreen />}>
              <TopicDetailModular />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      <Route
        path="/courses/create"
        element={
          <InstructorRoute>
            <Suspense fallback={<LoadingScreen />}>
              <CreateCourse />
            </Suspense>
          </InstructorRoute>
        }
      />

      <Route
        path="/courses/edit/:courseId"
        element={
          <InstructorRoute>
            <Suspense fallback={<LoadingScreen />}>
              <EditCourse />
            </Suspense>
          </InstructorRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Suspense fallback={<LoadingScreen />}>
              <AdminPanel />
            </Suspense>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/subjects"
        element={
          <AdminRoute>
            <Suspense fallback={<LoadingScreen />}>
              <AdminSubjects />
            </Suspense>
          </AdminRoute>
        }
      />

      <Route
        path="/dsa-sheet"
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingScreen />}>
              <DSASheet />
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/dsa-bookmarks"
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingScreen />}>
              <DSABookmarks />
            </Suspense>
          </PrivateRoute>
        }
      />

      <Route
        path="/code-editor"
        element={
          <Suspense fallback={<LoadingScreen />}>
            <CodeEditor />
          </Suspense>
        }
      />

      <Route
        path="/admin/dsa"
        element={
          <AdminRoute>
            <Suspense fallback={<LoadingScreen />}>
              <AdminDSA />
            </Suspense>
          </AdminRoute>
        }
      />

      <Route
        path="/dsa-management"
        element={
          <InstructorOrAdminRoute>
            <Suspense fallback={<LoadingScreen />}>
              <AdminDSA />
            </Suspense>
          </InstructorOrAdminRoute>
        }
      />

      <Route
        path="/instructor-panel"
        element={
          <InstructorRoute>
            <Suspense fallback={<LoadingScreen />}>
              <InstructorPanel />
            </Suspense>
          </InstructorRoute>
        }
      />

      <Route path="/courses/:courseId" element={
        <Suspense fallback={<LoadingScreen />}>
          <CourseView />
        </Suspense>
      } />
    </Routes>
  );
};

// Main App component
function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AppRoutes />
        <YouTubeSubscriptionPopup />
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