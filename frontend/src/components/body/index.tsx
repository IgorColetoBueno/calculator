import { PropsWithChildren } from "react";

const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="p-4 text-white">
      <div className="max-w-6xl mx-auto py-5">{children}</div>
    </main>
  );
};

export default Main;
