import { Link } from 'react-router-dom';
import { Button } from './Button';

export const Header = ({ children }: { children?: React.ReactNode }) => {
  return (
    <header className="bg-purple-600 px-4 py-2.5 lg:px-6">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <Link to="/">
          <Button variant="plain" className="!px-0 text-white">
            Queer Help
          </Button>
        </Link>
        {children}
      </div>
    </header>
  );
};
