import React, { useState}from 'react';
import Instructions from './instructions';
import Choices from './choices';
import DropZone from './fileUpload';

function Root(){
    const [inputValues, setInputValues] = useState({
        divisionFiles: 20000,
        rareLemmas: 2,
        frequentLemmas: 1,
        method: "artm_bigartm",
        numTopics: 20,
        numIterations: 30
      });

    return(
        <div>
    <Instructions></Instructions>
    <Choices setInputValues={setInputValues} inputValues={inputValues}></Choices>
    <DropZone inputValues={inputValues}></DropZone>
    </div>
    )
}

export default Root;