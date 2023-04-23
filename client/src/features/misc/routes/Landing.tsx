import { Header } from '@/components/Header';
import { HeaderNavigation } from '../components/HeaderNavigation';

export const Landing: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-stretch bg-purple-50">
      <Header>
        <div className="flex items-center gap-x-2">
          <HeaderNavigation />
        </div>
      </Header>
      <main>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-y-3">
          <h3 className="text-center text-xl font-semibold tracking-wider text-purple-700">
            Welcome!
          </h3>
          <h4 className="text-center text-lg font-semibold tracking-wider text-violet-400">
            Here is your starting point to do something good
          </h4>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-y-10">
          <h4 className="text-center text-xl font-semibold tracking-wider text-purple-800">
            Do you need help?
          </h4>
          <div className="w-screen-md flex justify-between gap-x-5">
            <div className="flex h-40 w-52 items-center rounded-md border border-violet-800 bg-white p-3 text-center text-violet-900">
              Sign up, tell us a little bit about yourself
            </div>
            <div className="flex h-40 w-52 items-center justify-center rounded-md border border-violet-800 bg-white p-3 text-center text-violet-900">
              Get verified
            </div>
            <div className="flex h-40 w-52 items-center justify-center rounded-md border border-violet-800 bg-white p-3 text-center text-violet-900">
              Request assistance
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-y-10">
          <h4 className="text-center text-xl font-semibold tracking-wider text-purple-800">
            Do you want to become a volunteer?
          </h4>
          <div className="w-screen-md flex justify-between gap-x-5">
            <div className="flex h-40 w-52 items-center rounded-md border border-violet-800 bg-white p-3 text-center text-violet-900">
              Sign up, tell us what would you like to help with
            </div>
            <div className="flex h-40 w-52 items-center justify-center rounded-md border border-violet-800 bg-white p-3 text-center text-violet-900">
              Get verified
            </div>
            <div className="flex h-40 w-52 items-center justify-center rounded-md border border-violet-800 bg-white p-3 text-center text-violet-900">
              View requests and reach out for assistance
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
