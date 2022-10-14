let pandaOneDiet = 25;
let dollarsCount;
let pandaDietValue = document.querySelector('.pet-calculator__value');
let radioInputs = (document.querySelector('.header--donate')) ? [...document.querySelectorAll('.radiofield-item__input')] : 0;
let radioInputsList = document.querySelector('.radiofield-list');
let valueInput = document.querySelector('.input--dollar');
let sendForm = document.querySelector('.donation-form');


if (document.querySelector('.header--donate')) {
  radioInputsList.addEventListener('input', () => {
    for (const input of radioInputs) {
      if (input.checked) {
        pandaDietValue.innerHTML = `${input.value/pandaOneDiet}`;
        valueInput.value = input.value;
      }
    }
  })

  let radioInputsValues = [];
  radioInputs.forEach(elem => radioInputsValues.push(elem.value));

  valueInput.addEventListener('input', (event) => {
    radioInputs.forEach(elem => elem.checked = false);

    if (valueInput.value.length > 4) valueInput.value = valueInput.value.slice (0,4);
    if (event.data == 'e' || event.data == '-') {
      valueInput.value = valueInput.value.slice(0,4);
    }

    pandaDietValue.innerHTML = `${Math.floor(valueInput.value/pandaOneDiet)}`;

    radioInputsValues.forEach( (elem, index) => (elem == valueInput.value) ? radioInputs[index].checked = true : radioInputs[index].checked = false)
  })
}

if (document.querySelector('.header--donate')) sendForm.addEventListener('submit', (e) => e.preventDefault());