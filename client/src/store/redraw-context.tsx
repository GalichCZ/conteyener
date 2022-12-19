import React, { useState, createContext } from "react";

export interface ReDrawContextInterface {
  reDraw: boolean;
  reDrawHandler: (c: boolean) => void;
}

const ReDrawContext = createContext<ReDrawContextInterface>({
  reDraw: false,
  reDrawHandler: () => {},
});

export const ReDrawContextProvider = (props: any) => {
  const [reDraw, setReDraw] = useState<boolean>(false);

  const reDrawHandler = (value: boolean) => {
    setReDraw(value);
  };

  const contextValue = {
    reDraw,
    reDrawHandler,
  };

  return (
    <ReDrawContext.Provider value={contextValue}>
      {props.children}
    </ReDrawContext.Provider>
  );
};

export default ReDrawContext;
