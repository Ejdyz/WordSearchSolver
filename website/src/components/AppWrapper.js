"use client"
import React from 'react';
import WordMeshGenerator from "@/components/WordMeshGenerator";
import MeshInputs from "@/components/MeshInputs";
import {useRouter} from "next/navigation";
import WordsInputs from "@/components/WordsInputs";

const AppWrapper = () => {
  const router = useRouter();
  const WordMeshRef = React.useRef([["","",""],["","",""],["","",""]]);
  const WordsToFindRef = React.useRef([]);

  const createMeshRef = (numOfRows, numOfCols) => {
    WordMeshRef.current = Array.from({length: numOfRows}, () => Array.from({length: numOfCols}, () => ""));
    router.refresh()
  }

  const updateWordsToFind = (words) => {
    WordsToFindRef.current = words;
  }

  return (
    <div className={"flex flex-col gap-4 items-center"}>
      <WordMeshGenerator updateMeshRef={createMeshRef} />
      <MeshInputs meshRef={WordMeshRef} />
      <WordsInputs updateWordsToFind={updateWordsToFind} />
    </div>
  );
};

export default AppWrapper;