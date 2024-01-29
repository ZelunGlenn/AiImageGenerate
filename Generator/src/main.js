import './style.css';
import './input.css';
const form = document.querySelector('form');

form.addEventListener('submit', async(e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);
  const response = await fetch('http://localhost:8080/Generator', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });

  if(response.ok) {
    console.log('still in ?');
    const {image} = await response.json();

    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" class="h-auto" />`;
  } else {
    console.log("detect error");
    const err = await response.text();
    alert(err);
    console.error(err);
  }
  noSpinner();

  
});


function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Generating... <span class="spinner">🧠</span>';
}

function noSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Generate';
}
