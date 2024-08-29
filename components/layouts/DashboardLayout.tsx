import React from "react";
import SideNav from "./SideNav";

const DashboardLayout: React.FC<{
  contentContainerClassName?: string;
  children: React.ReactNode;
}> = ({ contentContainerClassName, children }) => {
  return (
    <div className="flex items-stretch">
      <SideNav />
      <div
        className={`${contentContainerClassName} flex-1 px-6 sm:px-10 tablet:px-20`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
