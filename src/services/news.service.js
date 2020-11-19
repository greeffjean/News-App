import newsApp from '../config';

const apiKey = `${newsApp.apiKey}`;

export function searchTitles(query, filter) {

    var url = 'http://newsapi.org/v2/everything?' +
        `q=${query}&` +
        `from=${filter}&` +
        'sortBy=popularity&' +
        `apiKey=${apiKey}`;

    return new Promise(resolve => {
        var req = new Request(url);

        fetch(req, { headers: {
            Authorization: `Bearer ${apiKey}`
          }})
            .then(response => {
                console.log(response);
                resolve(response.json())

            }).catch(response => {
                resolve(response)
                console.log(response)
            })
    })
}



