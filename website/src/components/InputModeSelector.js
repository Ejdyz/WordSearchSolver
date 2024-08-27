import React from 'react';
import MeshInputs from "@/components/MeshInputs";
import MeshInput2 from "@/components/MeshInput2";
import {Switch} from "@nextui-org/react";

const InputModeSelector = ({meshRef}) => {
  const [mode, setMode] = React.useState(true);

  return (
    <>
      <div className={"flex w-full flex-col items-center gap-2 mb-2"}>
        <h1>Input Mode</h1>
        <div className={"flex gap-2"}>
          <p>By row</p>
          <Switch onValueChange={setMode}  isSelected={mode} />
          <p>By char</p>
        </div>
      </div>
      {mode?
        <MeshInputs meshRef={meshRef}/>
        :
        <MeshInput2 meshRef={meshRef}/>
      }
    </>
  );
};

export default InputModeSelector;