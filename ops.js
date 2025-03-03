

/**
 * An object supporting a variety of methods for manipulation.
 * @param {string} parent 
 * @param {array} data 
 */
function BetterTable (parent,data) {
    this.parent = document.getElementById(parent);
    this.instance = document.querySelectorAll(`#${parent} > table`).length;
    this.combined = data;
    this.dataCells = this.data[0][0] == ' '? this.data.slice(1).map(z => z.slice(1)) : this.data;
    this.labels = this.data[0][0] == ' '? [this.data[0],[...this.data.map(x => x[0])]] : null;
    /**
     * Create the table based on input or current data.
     * @param {array} data 2D array || optional
     */
    this.draw = (data = this.combined) => {
        document.querySelector(`#myTable${this.instance}`) == null? null : document.querySelector(`#myTable${this.instance}`).remove();
        this.combined= data;
        let tab = document.createElement('table');
        for (let a = 0; a < this.combined.length; a++) {
            let r = document.createElement('tr');
            for (let b = 0; b < this.combined[a].length; b++) {
                let cell = document.createElement('td');
                cell.textContent = `${this.combined[a][b]}`;
                if (this.combined[0][0] == ' ') {   //Check if initial cell is a space. This suggests the first row and column are labels.
                    if (a == 0 || b == 0) {
                        a == 0 && b == 0? cell.classList.add('void') : cell.classList.add('label');
                    }
                }
                r.appendChild(cell);
            }
            tab.appendChild(r);
        }
        this.parent.appendChild(tab);
        tab.id = `myTable${this.instance}`;
    }
    /**
     * Change the content of a single cell.
     * @param {int} row 
     * @param {int} column 
     * @param {any} data 
     */
    this.changeCell = (row,column,data) => {
        this.data[row][column] = data;
        this.draw();
    }
}

let O = {
    ' ':['a','b','c','d','e','f'],
    'A': [0,1,2,3,4,5],
    'B': [6,7,8,9,10,11],
    'C': [12,13,14,15,16,17],
    'D': [18,19,20,21,22,13],
    'E': [24,25,26,27,28,29],
    'F': [30,31,32,33,34,35]
}

const fixObject = (object) => {
    let res = [];
    for (let [key,values] of Object.entries(object)) {
        res.push([key,...values]);
    }
    return res;
}

let J;

document.addEventListener('DOMContentLoaded',() => {
    J = new BetterTable('upper',fixObject(O))
    J.draw()
})