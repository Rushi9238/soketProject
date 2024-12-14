import React from "react";
import Side from "./Side";
import View from "../../../View/View";

const AuthLayout = () => {
  return (
    <>
      <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
        <Side>
          <View />
        </Side>
      </div>
    </>
  );
};

export default AuthLayout;
