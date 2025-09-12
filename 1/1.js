import { Matrix } from "../js/matrix.js"

let baseMatrix = Matrix.getStandardMatrix(4, 4);

const transfoLst = [
    [Matrix.fromNumLists(
        [2, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ), 'right'],
    [Matrix.fromNumLists(
        [1, 0, 0,   0],
        [0, 1, 0,   0],
        [0, 0, 0.5, 0],
        [0, 0, 0,   1],
    ), 'left'],
    [Matrix.fromNumLists(
        [1, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ), 'left'],
    [Matrix.fromNumLists(
        [0, 0, 0, 1],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 0],
    ), 'right'],
    [Matrix.fromNumLists(
        [1, 0,  0,  0],
        [-1, 1, -1, -1],
        [0, 0,  1,  0],
        [0, 0,  0,  1],
    ), 'left'],
    [Matrix.fromNumLists(
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ), 'right'],
    [Matrix.fromNumLists(
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ), 'right'],
]

const orderedListEl = document.createElement("ol");
document.body.appendChild(orderedListEl);

transfoLst.forEach(([transfo, position], index) => {
    const liEl = document.createElement("li");
    orderedListEl.appendChild(liEl);

    const equationEl = document.createElement("div");
    equationEl.classList.add("equation");
    liEl.appendChild(equationEl);

    equationEl.appendChild(baseMatrix.getEl());

    const mulOperatorEl = document.createElement("div");
    mulOperatorEl.classList.add("operator");
    mulOperatorEl.textContent = "x";

    const equalOperatorEl = document.createElement("div");
    equalOperatorEl.classList.add("operator")
    equalOperatorEl.textContent = "=";

    const transfoEl = transfo.getEl();
    if (position == 'left') {
        equationEl.prepend(mulOperatorEl);
        equationEl.prepend(transfoEl);
        baseMatrix = Matrix.mul(transfo, baseMatrix);
    } else {
        equationEl.appendChild(mulOperatorEl);
        equationEl.appendChild(transfoEl);
        baseMatrix = Matrix.mul(baseMatrix, transfo);
    }

    equationEl.appendChild(equalOperatorEl);
    equationEl.appendChild(baseMatrix.getEl());
})
