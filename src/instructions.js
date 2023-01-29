import React from 'react';
import { library, faFile, faCog, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Instructions() {
  return (
    <div style={{ width: "100%", height: "auto", display: "block", border: "2px solid gray", boxShadow: "2px 2px 2px gray" , backgroundColor: "white", backgroundSize: "200% auto"}}>
      <div className="parent" style={{height: "auto",display: "flex", alignItems: "center", justifyContent: "center", height: '200px'}}>
        <div className="child" style={{margin: "auto", width: "30%", boxShadow: "0px 2px 2px gray", textAlign: "center", height: '80%'}}> 
          <i><FontAwesomeIcon icon={faFile} size="3x"/></i>
          <p>Należy wybrać pliki, które chcesz przeanalizować - paczka ZIP. Korpusem jest dowolna paczka plików z różnymi tekstami</p>
        </div>
        <div className="child" style={{margin: "auto",width:"30%", boxShadow: "2px 2px 2px 2px gray", textAlign: "center", height: '80%'}}> 
        <i><FontAwesomeIcon icon={faCog} size="3x"/></i>
          <p>Następnie wybrać przycisk "Analizuj" i poczekać na załadowanie wyniku. Im większy rozmiar załadowanych plików tym dłuższy czas ładowania (będzie wyświetlony pasek postępu)</p>
        </div>
        <div className="child" style={{margin: "auto",width:"30%", boxShadow: "2px 2px 2px 0px gray", textAlign: "center", height: '80%'}}> 
        <i><FontAwesomeIcon icon={faDownload} size="3x"/></i>
          <p>Po wykonaniu analizy wyświetli się grafika z miarą ciepła.</p>
        </div>
      </div>
    </div>
  );
}
export default Instructions;