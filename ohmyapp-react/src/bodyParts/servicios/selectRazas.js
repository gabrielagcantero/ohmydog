import React, { useState } from "react";

function SelectRazas() {
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
      <select name="breed" value={selectedOption} onChange={handleOptionChange} required>
        <option value="" selected disabled>Seleccione la raza:</option>
        <option value="Mestizo">Mestizo</option>
        <option value="Caniche">Caniche</option>
        <option value="Labrador">Labrador</option>
        <option value="Golden retriever">Golden retriever</option>
        <option value="Salchicha">Salchicha</option>
        <option value="Boxer">Boxer</option>
        <option value="personalizada">Otro</option>
      </select>
      {showCustomOption && (
        <div className="form-group">
          <input
            type="text"
            id="customOption"
            name="otraRaza"
            pattern="[a-zA-Z ]{2,20}"
            value={customOption}
            onChange={handleCustomOptionChange}
            placeholder="Por favor especifique la raza"
            class="form-control"
            required
          />
        </div>
      )}
    </div>
  );
}

export default SelectRazas;