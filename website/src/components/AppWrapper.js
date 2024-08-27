"use client"
import React from 'react';
import WordMeshGenerator from "@/components/WordMeshGenerator";
import MeshInputs from "@/components/MeshInputs";
import {useRouter} from "next/navigation";
import WordsInputs from "@/components/WordsInputs";
import { Stepper } from 'primereact/stepper'
import { StepperPanel } from 'primereact/stepperpanel';
import {Button} from "primereact/button";
import MeshSolution from "@/components/MeshSolution";
const AppWrapper = () => {
  const router = useRouter();
  const stage = React.useRef(0);
  const WordMeshRef = React.useRef([["","",""],["","",""],["","",""]]);
  const WordsToFindRef = React.useRef([]);
  const stepperRef = React.useRef(null);

  const createMeshRef = (numOfRows, numOfCols) => {
    WordMeshRef.current = Array.from({length: numOfRows}, () => Array.from({length: numOfCols}, () => ""));
    stepperRef.current.nextCallback();
    router.refresh()
  }

  const updateWordsToFind = (words) => {
    WordsToFindRef.current = words;
  }

  const submit = () => {
    stage.current = 1;
    router.refresh()
  }
  if (stage.current === 0) {
    return (
      <Stepper ref={stepperRef}>
        <StepperPanel header="Create the mesh" className={"bg-black"}>
          <WordMeshGenerator updateMeshRef={createMeshRef}/>
        </StepperPanel>
        <StepperPanel header="Fill it up">
          <MeshInputs meshRef={WordMeshRef}/>
          <div className="flex pt-4 gap-2 justify-between w-full">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                    onClick={() => stepperRef.current.prevCallback()}/>
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                    onClick={() => stepperRef.current.nextCallback()}/>
          </div>
        </StepperPanel>
        <StepperPanel header="Input the words to find">
          <WordsInputs updateWordsToFind={updateWordsToFind}/>
          <div className="flex pt-4 justify-between">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                    onClick={() => stepperRef.current.prevCallback()}/>
            <Button label="Submit" severity="primary" icon="pi pi-arrow-left" onClick={submit}/>
          </div>
        </StepperPanel>
      </Stepper>
    );
  }
  if (stage.current === 1){
    return (
      <MeshSolution meshRef={WordMeshRef} wordsToFindRef={WordsToFindRef}/>
    )
  }
};

export default AppWrapper;