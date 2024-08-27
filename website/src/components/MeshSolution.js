import React from 'react';
import {Chip} from "@nextui-org/chip";

const MeshSolution = ({meshRef, wordsToFindRef}) => {
  console.log(meshRef)
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
        const currentChar = word[i];
        const nextChar = word[i + 1] === 'H' ? 'H' : null;
        const arrayChar = array[newRow] && array[newRow][newCol];

        if (
          newRow < 0 || newRow >= array.length ||
          newCol < 0 || newCol >= array[0].length ||
          (currentChar === 'C' && nextChar === 'H' && arrayChar !== 'CH') ||
          (currentChar !== 'C' && arrayChar !== currentChar)
        ) {
          found = false;
          break;
        }

        if (currentChar === 'C' && nextChar === 'H') {
          indexes.push({ rowIndex: newRow, columnIndex: newCol });
          i++; // Skip the next character in the word
        } else {
          indexes.push({ rowIndex: newRow, columnIndex: newCol });
        }
      }
      if (found) return indexes;
    }
    return null;
  };

  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      if (array[row][col] === word[0] || (word[0] === 'C' && word[1] === 'H' && array[row][col] === 'CH')) {
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
    console.log(wordsToFindRef)
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
    <div className={"w-screen flex items-center flex-col mt-4"}>
      <h1 className={"mb-4"}>Results</h1>
      <div className={"text-center"}>
        {meshRef.current.map((row, rowIndex) => (
          <div key={rowIndex} className={"flex flex-row gap-2"}>
            {row.map((col, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={"text-black aspect-square align-middle text-center md:size-[2rem] size-[1.2rem] mb-2  rounded  border " + (isCharInSelectedWord(rowIndex,colIndex)? "border-primary" :"" ) + (col.length === 2? " md:text-large text-xs md:pt-[1px]  pt-[2px]" : " md:text-2xl text-small")}>
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    <div className={"md:w-1/2 w-11/12"}>
      <h1>Words to find</h1>
      <div className={"w-full  border rounded-2xl  "}>
        <div className={"w-full min-h-32 max-h-96 overflow-auto"}>
          {wordsToFindRef.current.map((c, i) => (
            <Chip
              onClick={() => handleHover(c)}
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