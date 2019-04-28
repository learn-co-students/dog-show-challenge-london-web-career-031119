const DOGS_URL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {

})

const updateDog = dog =>
   fetch(DOGS_URL+`/${dog.id}`,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
         name: dog.name,
         breed: dog.breed,
         sex: dog.sex
      })
   }).then(r => r.status)

const editDog = dog => {
   const form = document.querySelector('#dog-form')
   form.name.value = dog.name
   form.breed.value = dog.breed
   form.sex.value = dog.sex
   form.addEventListener('submit',(e)=>{
      e.preventDefault()
      const eDog = {
         'id': dog.id,
         'name': form.name.value,
         'breed': form.breed.value,
         'sex': form.sex.value
      }
      updateDog(eDog)
   })
}

const showDog = dog => {
   const dogTable = document.querySelector('#table-body')
   const tr = document.createElement('tr')
   tr.innerHTML = `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button>Edit</button></td>`
   tr.addEventListener('click',()=>editDog(dog))
   dogTable.append(tr)
}

const showDogs = dogs => dogs.forEach(showDog)

const getDogs = () =>
fetch(DOGS_URL)
   .then(r => r.json())
   .then(showDogs)

getDogs()