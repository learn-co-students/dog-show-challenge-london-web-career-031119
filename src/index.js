const dogTable = document.querySelector("#table-body")
const dogForm = document.querySelector("#dog-form")

const state = {
  selectedDogToEdit: null
}

const renderDog = (dog) => {
  const dogRow = document.createElement('tr')
  dogRow.id = `dog${dog.id}`
  dogRow.innerHTML = `
  <td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td><button class="edit-btn">Edit Dog</button></td>
  `

  const editBtn = dogRow.querySelector('.edit-btn')
  const editName = document.querySelector('#edit-name')
  const editBreed = document.querySelector('#edit-breed')
  const editSex = document.querySelector('#edit-sex')

  editBtn.addEventListener('click', () => {
    editName.value = dog.name
    editBreed.value = dog.breed
    editSex.value = dog.sex

    state.selectedDogToEdit = dog
    })

  dogTable.append(dogRow)
}

const renderDogs = (dogs) => dogs.forEach(renderDog)

const addEventListenerToDogForm = () => {
  dogForm.addEventListener('submit', event => {
    event.preventDefault()

    const newDogInfo = {
      id: state.selectedDogToEdit.id,
      name: dogForm["edit-name"].value,
      breed: dogForm["edit-breed"].value,
      sex: dogForm["edit-sex"].value
    }

    const dogRow = document.querySelector(`#dog${newDogInfo.id}`)

    dogRow.innerHTML =`
    <td>${newDogInfo.name}</td>
    <td>${newDogInfo.breed}</td>
    <td>${newDogInfo.sex}</td>
    <td><button class="edit-btn">Edit Dog</button></td>
    `
    const editBtn = dogRow.querySelector('.edit-btn')
    const editName = document.querySelector('#edit-name')
    const editBreed = document.querySelector('#edit-breed')
    const editSex = document.querySelector('#edit-sex')
    editBtn.addEventListener('click', () => {
      editName.value = dog.name
      editBreed.value = dog.breed
      editSex.value = dog.sex
    })
    dogForm.reset()
    updateDog(newDogInfo)
    state.selectedDogToEdit = ""
  })}

const init = () => {
  getDogs()
  .then(renderDogs)
  addEventListenerToDogForm()
}

init();
