import React from "react";

interface SystemInfoCardInterface {
  children: React.ReactNode;
  infoType: string;
}


export function SystemInfoCard({ children, infoType }: SystemInfoCardInterface): React.JSX.Element {
  return (
    <div data-testid='systemInfoCard' className='flex-1 content-center'>
      <div className='capitalize bg-white text-gray-500 border border-gray-500 outline-white outline-4 justify-center' >
        <div data-testid={`systemInfoCard-content-${infoType}`} className='flex-1 m-1 md:text-3xl ellipsis-anim text-center' >
          {children}<span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
}