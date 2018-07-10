




export function logError(error) {
    const payload = {
        error_message: error.toString()
    }

    fetch("http://localhost:3000/api/error/", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
        //body: error
  
      })
      .then(function(response) {
          return response.json()
      })
}

export function checkError(response) {
    if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
}

export function getFormattedDate(dt) {
    var date = new Date(dt);
    var month = date.getMonth() + 1;
    var day = date. getDate();
    var year = date.getFullYear();
    return year + "-" + month + "-" + day ;
}