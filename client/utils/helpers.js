




export function logError(error) {

    alert("Error: " + error);
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
       alert("After logging");
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