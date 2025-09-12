import { VectorBase } from "./vector_base.js";
import { Polynomial } from "./polynomial.js";
import { cleanSplit } from "./utils.js";

export class VectorPolynomial extends VectorBase {
    constructor(componentLst) {
        componentLst.forEach((comp) => {
            if (!(comp instanceof Polynomial)) {
                throw new Error("Can only instanciate with polynomials.");
            }
        });
        super(componentLst);
    }

    static fromNumList(numLst) {
        const compLst = numLst.map(number => Polynomial.fromNumber(number));
        return new VectorPolynomial(compLst);
    }

    static fromString(vectorStr) {
        const tokens = cleanSplit(vectorStr, ',');
        return new VectorPolynomial(tokens.map(token => Polynomial.fromString(token)));
    }

    getEl() {
        const el = document.createElement("div");
        el.classList.add("vector");

        for (const pol of this.compLst) {
            el.appendChild(pol.getEl());
        }

        return el;
    }

    get isZero() {
        for (const pol of this.compLst) {
            if (!pol.isZero) {
                return false;
            }
        }
        return true;
    }

    static getStandardVector(colName, size) {
        const compLst = [];
        for (let i = 1; i <= size; i++) {
            const variable = colName + i.toString();
            compLst.push(Polynomial.fromVariable(variable));
        }

        return new VectorPolynomial(compLst);
    }

    static get0Vector(length) {
        const numLst = Array(length).fill(0);
        return VectorPolynomial.fromNumList(numLst);
    }

    static add(vec1, vec2) {
        if (vec1.length !== vec2.length) {
            throw new Error("Cannot sum vectors of different length");
        }

        const rescompLst = []
        for (let i = 0; i < vec1.length; i++) {
            rescompLst.push(Polynomial.add(vec1.compLst[i], vec2.compLst[i]));
        }

        return new VectorPolynomial(rescompLst);
    }

    mulPol(pol) {
        return new VectorPolynomial(this.compLst.map(polToMul => Polynomial.mul(polToMul, pol)));
    }

    static mul(vec1, vec2) {
        if (vec1.length !== vec2.length) {
            throw new Error("Cannot multiply vectors of different size.")
        }

        let resPol = Polynomial.fromNumber(0);

        for (let i = 0; i < vec1.length; i++) {
            resPol = Polynomial.add(resPol, Polynomial.mul(vec1.getComp(i), vec2.getComp(i)));
        }

        return resPol;
    }

}
