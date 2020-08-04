import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(res => res.data)
        .catch(e => console.log(e))
}

const create = (person) => {
    return axios.post(baseUrl, person)
        .then(res => res.data)
        .catch(e => console.log(e))
}

const update = (person) => {
    return axios.put(`${baseUrl}/${person.id}/`, {name: person.name, number: person.number})
        .then(res => res.data)
}

const remove = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`)
        .then(res => person)
}

export default {
    getAll,
    create,
    update,
    remove
}