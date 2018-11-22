const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5000'

const headers = {
    'Accept': 'application/json'
};

export const processText = (payload) =>
    fetch(`${api}/api/processtext`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {

        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const uploadFile = (payload) =>
    fetch(`${api}/api/upload`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

