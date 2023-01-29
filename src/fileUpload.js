import React, { useState, useEffect, useContext} from 'react';
import './fileUpload.css';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import axios from 'axios';
import Grid from './grid';
import Column from './column';
import Legend from './legend'


const { Dragger } = Upload;
const API_URL = "https://ws.clarin-pl.eu"



const DropZone = ({inputValues}) => {
  let [fileID, setFileID] = useState('');
  let [taskID,setTaskID] = useState('');
  let [width,setWidth]=useState(0);
  let [topic,setTopic]=useState('');
  let [chmura,setChmura] =useState([])
  let [rows,setRows] = useState('')
  let [vertical,setVertical] = useState('')
  let [bigArray,setBigArray] = useState([])
  let [topikiLength,setTopikiLength] = useState(0)
  let [download,setDownload] = useState('')
  let [images,setImages] = useState([])
  let [arrayDocuments, setArrayDocuments] = useState([])
  let [showLoading, setShowLoading] = useState(false);
  let [showResults, setShowResults] = useState(false);
  console.log(inputValues)

  const lnk = `https://ws.clarin-pl.eu/show/topic?results=${topic}&amp;lang=pl`
  useEffect(() => {
  const test = `|any2txt|div(${inputValues.divisionFiles})|wcrft2|fextor2({"features":"base","lang":"pl","filters":{"base":[{"type":"pos_stoplist","args":{"stoplist":["subst"],"excluding":false}}]}})|dir|feature2({"filter":{"base":{"min_df":2,"max_df":1,"keep_n":1000}}})|topic3({"no_topics":${inputValues.numTopics},"no_passes":${inputValues.numIterations},"method":"${inputValues.method}","alpha":-2,"beta":-0.01})`


  }, [fileID])

  //let response = 0;
  const handleChange = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
  
    }
    if (status === 'done') {

      
      message.success(`${info.file.name} file uploaded successfully.`);
      let fileResponse = info.file.response //to gówno consolloguje git
      setFileID(fileResponse)
   

      
      
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://ws.clarin-pl.eu/nlprest2/base/upload/',
    onChange: handleChange,
    onDrop(e) {

  },
  

  
  };
  async function startProcess(){
    const test = `|any2txt|div(${inputValues.divisionFiles})|wcrft2|fextor2({"features":"base","lang":"pl","filters":{"base":[{"type":"pos_stoplist","args":{"stoplist":["subst"],"excluding":false}}]}})|dir|feature2({"filter":{"base":{"min_df":2,"max_df":1,"keep_n":1000}}})|topic3({"no_topics":${inputValues.numTopics},"no_passes":${inputValues.numIterations},"method":"${inputValues.method}","alpha":-2,"beta":-0.01})`

    const lpmn = "filezip("+fileID+")"+ test;
  const request = {
      lpmn: lpmn,
      user: "249265@student.pwr.edu.pl",
  };
  setShowLoading(true)
  const response = await axios.post("https://ws.clarin-pl.eu/nlprest2/base/startTask", request);

  const taskid = response.data;

  setTaskID(taskid)
  let status = "";
  let jsonres = {};
  while (status !== "DONE") {
      const res = (await axios.get(`https://ws.clarin-pl.eu/nlprest2/base/getStatus/${taskid}`)).data;

      jsonres = res.value;

      status = res.status;

      setWidth(jsonres);
      if (status === "ERROR") {
          throw new Error("Error in processing");
      }
      if (status === "PROCESSING") {

      }
      if (status === "DONE") {
   
          setWidth(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));

  }

  setTopic(jsonres[0].fileID)

  
  if (status === "DONE") {

    const odp = await axios.get(`https://ws.clarin-pl.eu/nlprest2/base/download${jsonres[0].fileID}/topics.json`);


    const documents = odp.data.docs

    setRows(Object.keys(documents).length);
    const topiki = odp.data.topics
    setVertical(Object.keys(topiki).length);

    setTopikiLength(Object.keys(topiki).length);

    let arrayNames = Object.keys(documents)
    setArrayDocuments(arrayNames);
    setChmura((topiki));
    const mainArray = Object.values(documents);
    const newArray =[];
    for (let i=0; i< mainArray.length;i++){
      for (let z=0; z<Object.keys(topiki).length;z++){
        if(mainArray[i][`${z}`]){
          newArray.push(mainArray[i][`${z}`])
        } else {
          newArray.push(0);
        }
      }
    }
    const imageUrls =[]
  
    for (let i=0; i<Object.keys(topiki).length;i++){
      download=(`https://ws.clarin-pl.eu/nlprest2/base/download${jsonres[0].fileID}/${i}.png`)
      imageUrls.push(download)

    }
    setImages(imageUrls)
    setBigArray(newArray)
    setShowResults(true)
  }
 // getTaskResults();
 // downloadResult();
  }

  

 
  return (
    <div className="div-container">
         <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Kliknij lub przeciągnij plik na ten obszar aby go załadować</p>
    <p className="ant-upload-hint">
    Obsługuje przesyłanie pojedyncze lub zbiorcze. Nie zaleca się przesyłania danych firmowych lub innych
      plików tego typu
    </p>
  </Dragger>
  
      <div className="loading-bar">
        {showLoading === true && (<div className="nlp_progress_bar" style={{width: width*100 + '%'}}>
          {Math.floor(width*100)}%
        </div>)}
      </div>
      <div className="div-container">
        <div className="green-div" onClick={() => startProcess() }>Analizuj</div>
        
      </div>

      {showResults === true && (<div className='showResults' >
      <Legend></Legend>
      
      </div>)}
      
      {showResults === true && (<div className="results">
        
        <Column data={arrayDocuments}></Column>
        <Grid values={bigArray} length={topikiLength} imageUrls={images}></Grid>
      </div>)}
    </div>
    
  );
}

export default DropZone;