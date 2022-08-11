const addCard = (document) => {
    const front = document.getElementById("front").value;
    const back = document.getElementById("back").value;

    fetch(process.env.API ? process.env.API + "/add" : "http://localhost:5001/api/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ front: front, back: back, confidence: 0 }),
    }).then(response => {
        return response.json();
    }).then(res => {
        console.log(res);
    });
};


export default addCard;
