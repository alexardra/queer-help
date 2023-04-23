import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export const UserHeader: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Header>
      <div className="flex items-center gap-x-2">
        <Link to="/user/chat">
          <Button variant="primary" size="sm">
            Chat
          </Button>
        </Link>
        <Button
          variant="inverse"
          size="sm"
          onClick={() => {
            if (logout) logout();
            navigate('/');
          }}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};
