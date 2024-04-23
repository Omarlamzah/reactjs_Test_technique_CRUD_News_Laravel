import React from 'react';
import "./css.css"

const Checkboxdarkmode = ({onchangemode}) => {
    return (
        <div>
            

            <label className="ui-switch">
  <input onChange={(event)=>{onchangemode(event)}} type="checkbox"/>
  <div className="slider">
    <div className="circle"></div>
  </div>
</label>




        </div>
    );
}

export default Checkboxdarkmode;
