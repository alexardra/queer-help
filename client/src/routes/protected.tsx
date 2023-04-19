const App = () => {
  return <div>protected app ahahaha</div>;
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
  },
];
