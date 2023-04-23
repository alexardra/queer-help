import { Header } from '@/components/Header';
import { HeaderNavigation } from '../components/HeaderNavigation';

export const Landing: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-stretch bg-purple-100">
      <Header>
        <div className="flex items-center gap-x-2">
          <HeaderNavigation />
        </div>
      </Header>
      <main></main>
    </div>
  );
};
