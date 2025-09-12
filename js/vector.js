import { Polynomial } from "./polynomial.js";
import { cleanSplit } from "./utils.js";

export class Vector {
    constructor(polynomialLst) {
        this.polLst = [];
        for (let pol of polynomialLst) {
            if (!(pol instanceof Polynomial)) {
                throw new Error("Can only instanciate with polynomials.");
            }
            this.polLst.push(pol);
        }
    }

    static fromNumList(numLst) {
        const polLst = numLst.map(number => Polynomial.fromNumber(number));
        return new Vector(polLst);
    }

    static fromString(vectorStr) {
        const tokens = cleanSplit(vectorStr, ',');
        return new Vector(tokens.map(token => Polynomial.fromString(token)));
    }

    static getStandardVector(colName, size) {
        const polLst = [];
        for (let i = 1; i <= size; i++) {
            const variable = colName + i.toString();
            polLst.push(Polynomial.fromVariable(variable));
        }

        return new Vector(polLst);
    }
    
    toString() {
        return this.polLst.join(',')
    }

    getEl() {
        const el = document.createElement("div");
        el.classList.add("vector");

        for (const pol of this.polLst) {
            el.appendChild(pol.getEl());
        }

        return el;
    }

    getPol(index) {
        return this.polLst[index];
    }

    isZero() {
        for (const pol of this.polLst) {
            if (!pol.isZero()) {
                return false;
            }
        }
        return true;
    }

    getOpposite() {
        return this.mulPol(Polynomial.fromNumber(-1));
    }

    static isEqual(vec1, vec2) {
        return Vector.add(vec1, vec2.getOpposite()).isZero();
    }

    static get0Vector(length) {
        const numLst = Array(length).fill(0);
        return Vector.fromNumList(numLst);
    }

    get length() {
        return this.polLst.length;
    }

    static add(vec1, vec2) {
        if (vec1.length !== vec2.length) {
            throw new Error("Cannot sum vectors of different length");
        }

        const resPolLst = []
        for (let i = 0; i < vec1.length; i++) {
            resPolLst.push(Polynomial.add(vec1.polLst[i], vec2.polLst[i]))
        }

        return new Vector(resPolLst);
    }

    mulPol(pol) {
        return new Vector(this.polLst.map(polToMul => Polynomial.mul(polToMul, pol)));
    }

    static mul(vec1, vec2) {
        if (vec1.length !== vec2.length) {
            throw new Error("Cannot multiply vectors of different size.")
        }

        let resPol = Polynomial.fromNumber(0);

        for (let i = 0; i < vec1.length; i++) {
            resPol = Polynomial.add(resPol, Polynomial.mul(vec1.getPol(i), vec2.getPol(i)));
        }

        return resPol;
    }

    static areOrthogonals(vec1, vec2) {
        return Vector.mul(vec1, vec2).isZero();
    }
}
