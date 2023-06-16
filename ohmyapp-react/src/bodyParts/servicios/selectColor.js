import React, { useState } from "react";

function SelectColor() {
  const [selectedOption, setSelectedOption] = useState("");
  const [customOption, setCustomOption] = useState("");
  const [showCustomOption, setShowCustomOption] = useState(false);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === "personalizada") {
      setShowCustomOption(true);
    } else {
      setShowCustomOption(false);
    }
  };

  const handleCustomOptionChange = (event) => {
    setCustomOption(event.target.value);
  };

  return (
    <div className="form-group">
      <select name="color" value={selectedOption} onChange={handleOptionChange} required>
        <option value="" selected disabled>Seleccione el color:</option>
        <option value="Negro">Negro</option>
        <option value="Blanco">Blanco</option>
        <option value="Marrón">Marrón</option>
        <option value="Atigrado">Atigrado</option>
        <option value="Con manchas">Con manchas</option>
        <option value="personalizada">Otro</option>
      </select>
      {showCustomOption && (
        <div className="form-group">
          <input
            type="text"
            id="customOption"
            name="otroColor"
            pattern="[a-zA-Z ]{2,50}"
            value={customOption}
            onChange={handleCustomOptionChange}
            placeholder="Por favor especifique el color"
            class="form-control"
            required
          />
        </div>
      )}
    </div>
  );
}

export default SelectColor;