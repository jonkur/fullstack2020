import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(res => res.data)
        .catch(e => console.log(e))
}

const create = (person) => {
    return axios.post(baseUrl, person)
        .then(res => {
            return res.data
        })
        .catch(err => {  
            console.log(err.response);
            throw err
        })
}

const update = (person) => {
    return axios.put(`${baseUrl}/${person.id}/`, {name: person.name, number: person.number})
        .then(res => res.data)
        .catch(err => {
            console.log(err.response);
            throw err
        })
}

const remove = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`)
        .then(res => person)
        .catch(err => {
            console.log(err.response)
            throw err
        })
}

export default {
    getAll,
    create,
    update,
    remove
}