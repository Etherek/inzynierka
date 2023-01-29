import React from 'react';
import './grid.css';



const Grid = ({values,length,imageUrls}) => {

  return (
    <div className='table'>
      {values.map((value, index) => {
        let color = 'white';
        if(value >= 0.9) {
          color = 'red';
        } else if(value >= 0.8) {
          color = 'orangered';
        } else if(value >= 0.7) {
          color = 'orange';
        } else if(value >= 0.6) {
            color = 'olive';
          }else if(value >= 0.5) {
            color = 'yellow';
          }else if(value >= 0.4) {
            color = 'yellowgreen';
          }else if(value >= 0.3) {
            color = 'aquamarine)';
          }else if(value >= 0.2) {
            color = 'aqua';
          }else if(value >= 0.1) {
            color = 'royalblue';
          }else  {
            color = 'blue';
          }
        let wynik = index % length;
        return <div className="cell" key={index} style={{background: color, width: (100/(length)+"%") , height: '20px'}}
        onMouseOver={(e) => {

          document.getElementById("image").src = imageUrls[wynik];
          document.getElementById("image").style.display = 'block';
          document.getElementById("image").style.position = 'absolute';
          document.getElementById("image").style.zIndex = '1000';
          document.getElementById("image").style.top = e.pageY + 'px';
          document.getElementById("image").style.left = e.pageX + 'px';
          document.getElementById("image").style.width = '300px';
          document.getElementById("image").style.height = '300px';
      }}        
      onMouseOut={() => {
        document.getElementById("image").style.display = 'none';
    }}

      >
         <img id="image" style={{display: 'none'}} src={imageUrls[0]}/></div>;
      })}
    </div>
  );
}

export default Grid;