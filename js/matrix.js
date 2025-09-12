import { Vector } from "./vector.js";

export class Matrix {
    constructor(vectorLst) {
        this.vectorLst = [];
        if (!vectorLst) {
            throw new Error("Cannot create empty matrix.")
        }
        let vecDimension = vectorLst[0].length;
        for (let vec of vectorLst){
            if (!(vec instanceof Vector)) {
                throw new Error("Can only instantiate with vectors");
            }
            if (vec.length !== vecDimension) {
                throw new Error("All vectors must be of same dimension");
            }
            this.vectorLst.push(vec);
        }
    }

    static fromNumLists(...numLsts) {
        return new Matrix(numLsts.map(numLst => Vector.fromNumList(numLst)));
    }

    static getStandardMatrix(m, n) {
        const vectorLst = [];
        for (let i = 0; i < n; i++) {
            const colName = String.fromCharCode('a'.charCodeAt(0) + i);
            vectorLst.push(Vector.getStandardVector(colName, m));
        }

        return new Matrix(vectorLst);
    }

    toString() {
        return this.vectorLst.join(';');
    }

    getEl() {
        const el = document.createElement("div");
        el.classList.add("matrix");

        for (const vector of this.vectorLst) {
            el.appendChild(vector.getEl());
        }

        return el;
    }

    get m() {
        return this.vectorLst[0].length;
    }

    get n() {
        return this.vectorLst.length;
    }

    getVector(i) {
        return this.vectorLst[i];
    }

    getPol(i, j) {
        return this.getVector(j).getPol(i);
    }

    getHermitian() {
        const resVectorLst = [];

        for (let i = 0; i < this.m; i++) {
            const polLst = []
            for (let j = 0; j < this.n ; j++) {
                polLst.push(this.getPol(i, j));
            }
            resVectorLst.push(new Vector(polLst));
        }

        return new Matrix(resVectorLst);
    }

    static add(mat1, mat2) {
        if (mat1.n !== mat2.n) {
            throw new Error("matrices must have number of vectors for addition.");
        }

        const resVectorLst = [];
        for (let i = 0; i < mat1.n; i++) {
            resVectorLst.push(Vector.add(mat1.getVector(i), mat2.getVector(i)));
        }

        return new Matrix(resVectorLst);
    }

    mulPol(pol) {
        const resVectorLst = []
        for (const vector of this.vectorLst) {
            resVectorLst.push(vector.mulPol(pol));
        }

        return new Matrix(resVectorLst);
    }

    mulVector(vec) {
        if (this.n !== vec.length) {
            throw new Error("Wrong dimensions for matrix vector multiplication.");
        }
        let resVector = Vector.get0Vector(this.m);
        for (let i = 0; i < this.n; i++) {
            resVector = Vector.add(resVector, this.vectorLst[i].mulPol(vec.polLst[i]));
        }

        return resVector;
    }

    static mul(mat1, mat2) {
        const resVectorLst = [];
        for (const vec2 of mat2.vectorLst) {
            resVectorLst.push(mat1.mulVector(vec2));
        }

        return new Matrix(resVectorLst);
    }
}
