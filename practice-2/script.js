async function getData() {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (response.ok) {
        let data = await response.json();
        return data
    } else {
        alert('error', response.status);
    }
}

async function displayTable() {
    let data = await getData();
 
        let col = [];
        for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
 
        let table = document.createElement("table");
 
        let tr = table.insertRow(-1);   

        for (let i = 0; i < col.length; i++) {
            let th = document.createElement("th");     
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
 
        for (let i = 0; i < data.length; i++) {

            tr = table.insertRow(-1);

            for (let j = 0; j < col.length; j++) {
                let tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }
        }
 
        let showTable = document.getElementById('table');
        showTable.innerHTML = "";
        showTable.appendChild(table);
}

displayTable();
