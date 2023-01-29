import React from 'react';

function Column({data}) {

    return (
        <div>
            {data.map((value, index) => (
                <div key={index}>{value}</div>
            ))}
        </div>
      );
    }

export default Column