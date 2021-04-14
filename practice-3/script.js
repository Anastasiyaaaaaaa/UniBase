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
    table.className = "table-sortable";
    table.setAttribute("id", "filter_table")

    let header = table.createTHead();
    let tr = header.insertRow(-1);
    tr.className = "header";

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    let body = table.createTBody();

    for (let i = 0; i < data.length; i++) {

        tr = body.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][col[j]];
        }
    }

    let showTable = document.getElementById('table-content');
    showTable.innerHTML = "";
    showTable.appendChild(table);


    document.querySelectorAll(".table-sortable th").forEach(headerCell => {

        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains("th-sort-asc");

            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });
}


/* Sort */
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr")); 
    const sortedRows = rows.sort((a, b) => {

        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        if (isNumber(aColText)) {
            return Number(aColText) > Number(bColText) ? (1 * dirModifier) : (-1 * dirModifier);
        }
        else return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.append(...sortedRows);

    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}



/* Filter */
function filterTable() {
    const filter = document.querySelector('#myInput').value.toUpperCase();
    const trs = document.querySelectorAll('#filter_table tr:not(.header)');

    if (filter.length >= 3) {
        trs.forEach(tr => tr.style.display = [...tr.children].find(td => td.innerHTML.toUpperCase().includes(filter)) ? '' : 'none');
    } else {
        trs.forEach(tr => tr.style.display = '');
    }
}

displayTable();
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }