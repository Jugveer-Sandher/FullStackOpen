import axios from 'axios'
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res => res.data);
}

const create = newPerson => {
    const req = axios.post(baseUrl, newPerson);
    return req.then (res => res.data);
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getAll, create, update, deletePerson };