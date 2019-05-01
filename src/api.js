const DOGS = 'http://localhost:3000/dogs'

const getDogs = () =>
  fetch(DOGS)
  .then(resp => resp.json())

const updateDog = (dog) =>{
  debugger
  return fetch(DOGS+`/${dog.id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(dog)
  }).then(resp=>resp.json())}
