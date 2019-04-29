document.addEventListener('DOMContentLoaded', () => {
    init()
})

//! API Stuff
const url = 'http://localhost:3000/dogs'

const getDogs = () =>
  fetch(url)
  .then(resp => resp.json())

const editDog = (dog) =>
    fetch(`http://localhost:3000/dogs/${dog.id}`,  {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(dog)
}).then(resp => resp.json())

//! Code
const renderDog = dog => {
    const tbody =  document.querySelector('tbody')
    const table = document.createElement('tr')
    table.dataset.id = dog.id
    table.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button>Edit</button></td>
    `
    tbody.append(table)
    
    const edit = table.querySelector('button')

    edit.addEventListener('click', () => {
        const form = document.querySelector('#dog-form')
        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex
        form.dogId.value = dog.id        
    })
}

const renderDogs = dogs => {
    dogs.forEach(renderDog)
}

const EditForm = () => {
    const form = document.querySelector('#dog-form')
    form.addEventListener('submit', event => {
        event.preventDefault()
        const dog = {
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value,
            id: form.dogId.value
        }
        editDog(dog)
        form.reset()

        fillRow(dog)
    })
}

const fillRow = (dog) => {
    const tr = document.querySelector(`tr[data-id='${dog.id}']`)
    tr.innerHTML = `
    <td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button>Edit</button></td>
    `
}

const init = () => {
    getDogs()
    .then(renderDogs)
    .then(EditForm)
}