import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#fafaf9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        gap: '16px',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #1a5f4a 0%, #2d8a6e 100%)',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '24px',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>
          P
        </div>
        <span style={{ fontSize: '15px', color: '#57534e', fontWeight: '500' }}>
          Loading...
        </span>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(0.95); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
