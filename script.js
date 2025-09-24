import { Matrix } from "./js/matrix.js";

// Classical Grand-Schmidt Orthogonalization

let titleEl = document.createElement("h2");
titleEl.textContent = "Classical Grand-Schmidt Orthogonalization";
document.body.appendChild(titleEl);
let orderedListEl = document.createElement("ol");
document.body.appendChild(orderedListEl);

let matrices = [
    Matrix.fromNumLists(
        [1, 1, 0],
        [1, 0, 1],
    ),
    Matrix.fromNumLists(
        [1, 1, 0, 1],
        [1, 0, 1, 1],
        [0, 1, 1, 1],
        [2, 1, 3, 4],
    ),
    Matrix.fromNumLists(
        [1, 0, 1, 1],
        [2, 1, 0, 1],
        [0, 1, 2, 1],
    ),

]
for (let A of matrices) {
    let liEl = document.createElement("li");
    orderedListEl.appendChild(liEl);
    let equationEl = document.createElement("div");
    equationEl.classList.add("equation");
    liEl.appendChild(equationEl);

    equationEl.appendChild(A.getEl());

    const [Q, R] = A.getClassicalGSOrthogonalization();
    let equalOperatorEl = document.createElement("div");
    equalOperatorEl.classList.add("operator")
    equalOperatorEl.textContent = "=";
    equationEl.appendChild(equalOperatorEl);

    equationEl.appendChild(Q.getEl());

    const mulOperatorEl = document.createElement("div");
    mulOperatorEl.classList.add("operator");
    mulOperatorEl.textContent = "x";
    equationEl.appendChild(mulOperatorEl);

    equationEl.appendChild(R.getEl());

    equalOperatorEl = document.createElement("div");
    equalOperatorEl.classList.add("operator")
    equalOperatorEl.textContent = "=";
    equationEl.appendChild(equalOperatorEl);

    let resMat = Matrix.mul(Q, R);
    equationEl.appendChild(resMat.getEl());
}
