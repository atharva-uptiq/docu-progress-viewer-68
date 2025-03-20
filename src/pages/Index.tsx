
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard when accessing the index page
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center animate-pulse">
        <h1 className="text-2xl font-bold mb-4">Redirecting to Dashboard...</h1>
      </div>
    </div>
  );
};

export default Index;
