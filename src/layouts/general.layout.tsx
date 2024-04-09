import { PropsWithChildren } from 'react';

export type GeneralLayoutProps = PropsWithChildren<{}>;

export const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <div className="min-h-screen bg-cover bg-fixed bg-no-repeat">
      <div className="h-full w-full">{children}</div>
    </div>
  );
};
