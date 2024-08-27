import React from 'react';
import {Chip} from "@nextui-org/chip";

const MeshSolution = ({meshRef, wordsToFindRef}) => {
  const findWordIn2DArray = (word, array) => {
    const directions = [
      [0, 1],  // right
      [1, 0],  // down
      [0, -1], // left
      [-1, 0], // up
      [1, 1],  // down-right
      [1, -1], // down-left
      [-1, 1], // up-right
      [-1, -1] // up-left
    ];

    const searchFromPosition = (row, col, word) => {
      for (let [dx, dy] of directions) {
        let found = true;
        const indexes = [];
        for (let i = 0; i < word.length; i++) {
          const newRow = row + i * dx;
          const newCol = col + i * dy;
          if (
            newRow < 0 || newRow >= array.length ||
            newCol < 0 || newCol >= array[0].length ||
            array[newRow][newCol] !== word[i]
          ) {
            found = false;
            break;
          }
          indexes.push({ rowIndex: newRow, columnIndex: newCol });
        }
        if (found) return indexes;
      }
      return null;
    };

    for (let row = 0; row < array.length; row++) {
      for (let col = 0; col < array[row].length; col++) {
        if (array[row][col] === word[0]) {
          const result = searchFromPosition(row, col, word);
          if (result) {
            return { word, indexes: result };
          }
        }
      }
    }
    return { word, indexes: [] };
  };
  const [hoveredWord, setHoveredWord] = React.useState(null)

  const handleHover = (wordToFind) => {
    setHoveredWord(findWordIn2DArray(wordToFind.toUpperCase(), meshRef.current))
  }

  const isCharInSelectedWord = (rowIndex, colIndex) => {
    if(hoveredWord){
      return hoveredWord.indexes.some(({rowIndex: r, columnIndex: c}) => r === rowIndex && c === colIndex)
    }
    return false;
  }

  const resetHover = () => {
    setHoveredWord(null)
  }

  return (
    <div className={"w-full flex items-center flex-col mt-8"}>
      <div className={"text-center"}>
        {meshRef.current.map((row, rowIndex) => (
          <div key={rowIndex} className={"flex flex-row gap-2"}>
            {row.map((col, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={"text-black aspect-square text-center text-2xl h-[2ch] mb-2 w-[2ch] rounded capitalize border " + (isCharInSelectedWord(rowIndex,colIndex)? "border-primary" :"" )}>
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    <div className={"w-1/2"}>
      <h1>Words to find</h1>
      <div className={"w-full  border rounded-2xl  "}>
        <div className={"w-full min-h-32 max-h-96 overflow-auto"}>
          {wordsToFindRef.current.map((c, i) => (
            <Chip
              onMouseLeave={resetHover}
              onMouseEnter={() => handleHover(c)}
              color={"primary"} key={c} className={"m-1 max-w-44"}><p
              className={"max-w-44 overflow-auto"}>{c}</p></Chip>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MeshSolution;