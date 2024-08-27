import React from 'react';
import {Input} from "@nextui-org/input";

const MeshInput2 = ({meshRef}) => {
  const numberOfCols = meshRef.current[0].length;
  const [error, setError] = React.useState(false);

  const setRow = (rowIndex, value) => {
    const values = value.split(",");
    const upperCaseValues = values.map((v) => v.toUpperCase());
    if (values.length !== numberOfCols) {
      setError({rowIndex:rowIndex, value: "Please enter the correct number of characters"});
      return;
    }else{
      setError(false);
    }

    if (values.some((v) => v.length > 2 || v.length < 1)) {
      setError({rowIndex:rowIndex, value: "Maximum characters per collumn is 2"});
      return;
    }
    meshRef.current[rowIndex] = upperCaseValues;
  }
  return (
    <div className={"flex flex-col gap-2"}>
      {meshRef.current.map((row, rowIndex) => (
          <Input
            placeholder={"Input all chars on row separated by commas (E,K,E,R,A,E,S,A)"}
            isInvalid={error && error.rowIndex === rowIndex} errorMessage={error && error.rowIndex === rowIndex? error.value :""} key={rowIndex} className={`w-[${numberOfCols * 5}rem]`} onValueChange={(e) => setRow(rowIndex,e)}/>
      ))}
    </div>
  );
};

export default MeshInput2;

// P,E,N,Z,I,O,N,A,R,A,V,A,p
// O,A,O,I,S,E,K,E,R,A,E,S,A
// L,K,S,N,T,I,M,A,N,Y,D,T,N
// K,O,í,T,R,A,K,T,O,R,O,A,O
// O,L,T,E,I,O,M,A,A,S,U,Ř,R
// P,O,K,R,E,S,S,L,L,L,C,Í,A
// A,T,A,L,O,P,A,T,A,H,Í,K,M
// N,O,T,O,M,A,N,U,R,D,O,Ř,A
// Á,Č,P,K,O,S,T,K,A,A,U,T,E
// K,F,L,A,S,T,R,A,K,A,V,O,Y
// H,K,O,T,V,A,O,N,V,E,H,A,L
// CH,A,R,A,R,A,B,O,V,É,P,E,s


// [["P","E","N","Z","I","O","N","A","R","A","V","A","P"]
// ["O","A","O","I","S","E","K","E","R","A","E","S","A"]
// ["L","K","S","N","T","I","M","A","N","Y","D","T","N"]
// ["K","O","Í","T","R","A","K","T","O","R","O","A","O"]
// ["O","L","T","E","I","O","M","A","A","S","U","Ř","R"]
// ["P","O","K","R","E","S","S","L","L","L","C","Í","A"]
// ["A","T","A","L","O","P","A","T","A","H","Í","K","M"]
// ["N","O","T","O","M","A","N","U","R","D","O","Ř","A"]
// ["Á","Č","P","K","O","S","T","K","A","A","U","T","E"]
// ["K","F","L","A","S","T","R","A","K","A","V","O","Y"]
// ["H","K","O","T","V","A","O","N","V","E","H","A","L"]
// ["CH","A","R","A","R","A","B","O","V","É","P","E","S"]]


//['Arabové', 'Otoman', 'Dalmatin', 'Panák', 'Pasti', 'Dynamit', 'Panorama', 'Flastr', 'Kalhoty', 'Kolotoč', 'kopaná', 'Kostka', 'Kotva', 'Lahev', 'Lopata', 'Loudal', 'Nosítka', 'Okres', 'Opava', 'Ostrava', 'Penzion', 'Poklop', 'Radar', 'Rarach', 'Sekera', 'Stařík', 'Straka', 'Talíř', 'Traktor', 'Tukan', 'Varan', 'Vedoucí']

