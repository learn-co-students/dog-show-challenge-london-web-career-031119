const dogTable = document.getElementById('table-body')
const dogForm = document.getElementById('dog-form')
let state = {
    dogs: [],
    selectedDog: null 
}


// render single dog 

const renderDog = (dog) => {
    let dogRow = document.createElement('tr')
    dogRow.id = dog.id 
    dogRow.innerHTML = `
        <th class="name" >${dog.name}</th>
        <th class="breed">${dog.breed}</th>
        <th class="sex">${dog.sex}</th>
        <th><button class="edit-bttn">Edit</button></th>
    ` 
    const editButton = dogRow.querySelector('.edit-bttn')
    editButton.addEventListener('click', () => {selectDog(dog)})
    dogTable.append(dogRow)
}

// render multiple dogs

const renderDogs = () => {
    state.dogs.forEach(renderDog)
}

// select dog 

const selectDog = (dog) => {
    state.selectedDog = dog
    dogForm.name.value = state.selectedDog.name
    dogForm.breed.value = state.selectedDog.breed 
    dogForm.sex.value = state.selectedDog.sex  
}

// add listener to dogForm 

const addListenerToDogForm = () => {
    dogForm.addEventListener('submit', (e) => {
        e.preventDefault()
        updateDog()
        state.selectedDog = null 
        dogForm.reset()
    })
}

// update dog

const updateDog = () => {
    updateDogState()
    updateDogView()
    API.updateDogServer()
}

// update dog in state 

const updateDogState = () => {
    state.selectedDog.name = dogForm.name.value 
    state.selectedDog.breed = dogForm.breed.value 
    state.selectedDog.sex = dogForm.sex.value 
}

// update dog view 

const updateDogView = () => {
    let updateRow = document.getElementById(state.selectedDog.id)
    updateRow.querySelector('.name').innerText = state.selectedDog.name
    updateRow.querySelector('.breed').innerText = state.selectedDog.breed
    updateRow.querySelector('.sex').innerText = state.selectedDog.sex

}


// initialise app 

const init = () => {
    API.getDogs()
        .then(dogs => state.dogs = dogs)
        .then(renderDogs)
    addListenerToDogForm() 

}

init() 

