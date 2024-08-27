import React from 'react';

const MeshInputs = ({meshRef}) => {

  const updatePosition = (rowIndex, colIndex, value) => {
    meshRef.current[rowIndex][colIndex] = value.toUpperCase();
    let nextPosition = [rowIndex, colIndex];

    if (colIndex < meshRef.current[rowIndex].length - 1) {
      nextPosition = [rowIndex, colIndex + 1];
    } else {
      if (rowIndex < meshRef.current.length - 1) {
        nextPosition = [rowIndex + 1, 0];
      }
    }

    const [nextRowIndex, nextColIndex] = nextPosition;
    document.getElementById(`${nextRowIndex}-${nextColIndex}`).focus();
  }

  return (
    <div className={"w-full justify-center flex"}>
      <div className={"flex flex-col gap-2"}>
        {meshRef.current.map((row, rowIndex) => (
          <div key={rowIndex} className={"flex flex-row gap-2"}>
            {row.map((col, colIndex) => (
              <input
                id={`${rowIndex}-${colIndex}`}
                key={`${rowIndex}-${colIndex}`}
                className={"text-black aspect-square text-center text-2xl p-1 max-w-[2.5ch] rounded capitalize border"}
                type={"text"}
                maxLength={1}
                onChange={(e) => {
                  updatePosition(rowIndex, colIndex, e.target.value);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeshInputs;