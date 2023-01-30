
import React from 'react';
import './choices.css'

export const InputContext = React.createContext();

const Choices = ({inputValues,setInputValues}) => {

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  let value;
  return (

    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '70%', textAlign: 'center', paddingBottom: '5%'}}>
        <div style={{display: 'flex', flexDirection: 'column',borderBottom: '1px solid gray'}}>
          <div style={{borderBottom: '1px solid gray'}}><h1>Opcje podstawowe</h1> 
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px', height:'100%'}}>
              <strong>Podział plików wejściowych</strong><input type="number" name="divisionFiles" value={inputValues.divisionFiles} onChange={handleChange} placeholder="20000" />
              <strong>Usuwanie rzadkich lematów</strong><input type="number" name="rareLemmas" value={inputValues.rareLemmas} onChange={handleChange} placeholder="2" />
              <strong>Usuwanie częstych lematów</strong><input type="number" name="frequentLemmas" value={inputValues.frequentLemmas} onChange={handleChange} placeholder="1" />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginRight: '10px', height:'100%'}}>
              <strong>Metoda </strong>
                <select name="method" value={inputValues.method} onChange={handleChange}>
                <option value="artm_bigartm">ARTM(BIGARTM)</option>
                <option value="LDA_mallet">LDA(mallet)</option>
                </select>

              <strong>Liczba tematów</strong><input type="number" name="numTopics"  value={inputValues.numTopics} onChange={handleChange} placeholder="Wpisz tekst tutaj" />
              <strong>Liczba iteracji</strong><input type="number" name="numIterations" value={inputValues.numIterations} onChange={handleChange} placeholder="Wpisz tekst tutaj" />
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}

export default Choices;