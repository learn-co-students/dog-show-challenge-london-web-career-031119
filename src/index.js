const state = {
  dogs: []
}

// loading in state
window.onload = () => {
  getDogs().then(() =>renderTable());
}
// API
const BASE_URL = "http://localhost:3000/dogs";

// do a patch then also call get after running
const getDogs = () => {
  state.dogs = []
  return get(BASE_URL)
    .then(dogs => dogs.map(dog => state.dogs.push(dog)));
}


const updateDog = dog => patch(`${BASE_URL}/${dog.id}`, dog);

// Restful Methods
const get = (url) => {
  return fetch(url)
  .then(resp => resp.json());
}

const patch = (url, data) => {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(url, configObj)
  .then(resp => resp.json());

}

// rendering elemnet on page
const createRow = dog => {
  const tr = document.createElement('tr');
  const dogString = JSON.stringify(dog);
  tr.innerHTML = `
  <td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td>
    <button onclick='editDog(${dogString})'>Edit</button>
  </td>
  `
  return tr;
}

const renderTable = () => {
  const tableBody = document.querySelector('tbody#table-body');
  tableBody.innerHTML = '';
  
  state.dogs.map(dog => createRow(dog)).map(el => tableBody.append(el));
}

const editDog = (dog) => {
  const form = document.getElementById('dog-form');
  form.onsubmit = () => submitEdit(dog.id);
  form.name.value = dog.name;
  form.breed.value = dog.breed;
  form.sex.value = dog.sex;
}

const submitEdit = id => {
  event.preventDefault();
  const form = event.target;

  dog = {
    name: form.name.value,
    breed: form.breed.value,
    sex: form.sex.value,
    id: id
  }

  updateDog(dog).then(() => {
    getDogs().then(() =>renderTable());
  });
  event.target.reset();
}