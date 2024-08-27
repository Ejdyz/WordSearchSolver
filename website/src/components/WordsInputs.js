import React from 'react';
import {Chip} from "@nextui-org/chip";
import {Input} from "@nextui-org/input";
import "./minimal-scroll.css"

const WordsInputs = ({updateWordsToFind}) => {
  const [inputWord, setInputWord] = React.useState("")
  const [words, setWords] = React.useState([])

  const save = (event) => {
    if(event.key === "Enter"){
      setWords([...words, event.target.value])
      setInputWord("");
      updateWordsToFind([...words, event.target.value])
    }
  }

  const removeClassAtIndex = (index) => {
    const updatedClasses = [...words]
    updatedClasses.splice(index,1)
    setWords(updatedClasses)
  }

  return (
    <div className={"flex w-full gap-4 px-8 flex-col items-center "}>
      <div className={"w-1/2"}>
        <Input
          label={"Words to find"}
          value={inputWord}
          onValueChange={setInputWord}
          onKeyDown={(e)=> save(e)}
        />
      </div>
      <div className={"w-1/2  border rounded-2xl  "}>
        <div className={"w-full min-h-32 max-h-96 overflow-auto"}>
          {words.map((c,i) => (
            <Chip color={"primary"} key={c} className={"m-1 max-w-44"} onClose={() => removeClassAtIndex(i)}><p className={"max-w-44 overflow-auto"}>{c}</p></Chip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordsInputs;