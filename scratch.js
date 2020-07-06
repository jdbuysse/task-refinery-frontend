function getStuff() {
    fetch(someURL, {
        headers: {
            "Content-Type": "application/json",
            "Authorization":  `Bearer ${localStorage.getItem(token)}`,
        }
    })
    .then(parseJSON)
    .then(console.log)
}