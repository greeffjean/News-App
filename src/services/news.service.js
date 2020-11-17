import newsApp from '../config';

export function newsService(query, filter) {
  
    const apiKey = `${newsApp.apiKey}`;

    var url = 'http://newsapi.org/v2/everything?' +
        `q=${query}&` +
        `from=${filter}&` +
        'sortBy=popularity&' +
        `apiKey=${apiKey}`;

    return new Promise(resolve => {
        var req = new Request(url);

        fetch(req)
            .then(response => {
                console.log(response);
                resolve(response.json())
                
            }).catch(response => {
                resolve(response)
                console.log(response)
            })
    })
}

