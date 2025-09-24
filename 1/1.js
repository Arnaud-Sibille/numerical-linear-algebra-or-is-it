import { MatrixPolynomial } from "../js/matrix_polynomial.js"

let baseMatrix = MatrixPolynomial.getStandardMatrix(4, 4);

const transfoLst = [
    [MatrixPolynomial.fromNumLists(
        [2, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ), 'right'],
    [MatrixPolynomial.fromNumLists(
        [1, 0, 0,   0],
        [0, 1, 0,   0],
        [0, 0, 0.5, 0],
        [0, 0, 0,   1],
    ), 'left'],
    [MatrixPolynomial.fromNumLists(
        [1, 0, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ), 'left'],
    [MatrixPolynomial.fromNumLists(
        [0, 0, 0, 1],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 0],
    ), 'right'],
    [MatrixPolynomial.fromNumLists(
        [1, 0,  0,  0],
        [-1, 1, -1, -1],
        [0, 0,  1,  0],
        [0, 0,  0,  1],
    ), 'left'],
    [MatrixPolynomial.fromNumLists(
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ), 'right'],
    [MatrixPolynomial.fromNumLists(
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
        baseMatrix = MatrixPolynomial.mul(transfo, baseMatrix);
    } else {
        equationEl.appendChild(mulOperatorEl);
        equationEl.appendChild(transfoEl);
        baseMatrix = MatrixPolynomial.mul(baseMatrix, transfo);
    }

    equationEl.appendChild(equalOperatorEl);
    equationEl.appendChild(baseMatrix.getEl());
})
