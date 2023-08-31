import axios from 'axios'

const url = 'http://localhost:3001/persons'

const get = () =>{
  return axios
  .get(url)
  .then(response => response.data)
}

const create = ({newName, newNumb}) =>{
  return axios
  .post(url,{name:newName, number:newNumb })
  .then(response => response.data)
}

const erase = id =>{
  return axios.delete(`${url}/${id}`)
}

const update = (id, updatedPerson) => {
  return axios
  .put(`${url}/${id}`, updatedPerson)
  .then(response => response.data)
}



export default {get, create, update, erase}

