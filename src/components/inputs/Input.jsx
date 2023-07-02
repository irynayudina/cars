import React, {useState} from 'react'
import './Input.css'
const Input = ({
  typeProp="text",
  idProp,
  placeholderProp,
  labelProp,
  valueInp,
  setValueInp,
}) => {
  const [filled, setFilled] = useState("");

  const handleChange = (event) => {
    setValueInp(event.target.value);
    if (event.target.value) {
      setFilled("filled");
    } else {
      setFilled("");
    }
  };
  return (
    <div class="input-wrapper">
      <input
        type={typeProp}
        id={idProp}
        placeholder={placeholderProp}
        className={filled}
        value={valueInp}
        onChange={handleChange}
      />
      <label htmlFor={idProp}>{labelProp}</label>
    </div>
  );
};

export default Input