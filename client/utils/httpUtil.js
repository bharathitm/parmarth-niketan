import axios from 'axios';

export function fetch(url, endpoint) {
    return axios
        .get(url + endpoint, {
            headers: {'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('accessToken')}
        });
}

export function store(url, endpoint, data) {
    return axios
        .post(url + endpoint, data, {
            headers: 
            {
                'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('accessToken'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
}

export function update(url, endpoint, data) {
    return axios
        .put(url + endpoint, data, {
            headers: {'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('accessToken')}
        });
}

export function destroy(url, endpoint) {
    return axios
        .delete(url + endpoint, {
            headers: {'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('accessToken')}
        });
}