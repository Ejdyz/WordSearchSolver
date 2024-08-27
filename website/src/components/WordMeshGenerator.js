"use client"
import React from 'react';
import {Input} from "@nextui-org/input";

const WordMeshGenerator = ({updateMeshRef}) => {
  const [numOfRows, setNumOfRows] = React.useState(0);
  const [numOfCols, setNumOfCols] = React.useState(0);
  const update = () => {
    updateMeshRef(numOfRows, numOfCols);
  }
  const onValueChange = (value, rows) => {
    const absValue = Math.abs(value)
    if (rows){
      setNumOfRows(absValue)
    } else {
      setNumOfCols(absValue)
    }
  }
  return (
    <div className={"w-full justify-center flex"}>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex flex-col"}>
          <label htmlFor="numOfRows">Number of Rows</label>
          <Input
            className={"rounded text-black"}
            id="numOfRows"
            type="number"
            value={numOfRows}
            onValueChange={(e) => onValueChange(e, true)}
          />
        </div>
        <div className={"flex flex-col"}>
          <label htmlFor="numOfCols">Number of Columns</label>
          <Input
            className={"text-black"}
            id="numOfCols"
            type="number"
            value={numOfCols}
            onValueChange={(e) => onValueChange(e, false)}
          />
        </div>
        <button
          className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
          onClick={update}
        >
          Generate Word Mesh
        </button>
      </div>

    </div>
  );
};

export default WordMeshGenerator;