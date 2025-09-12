import { MatrixBase } from "./matrix_base.js";
import { Polynomial } from "./polynomial.js";
import { VectorPolynomial } from "./vector_polynomial.js";

export class MatrixPolynomial extends MatrixBase {
    constructor(vectorLst) {
        vectorLst.forEach((vec) => {
            if (!(vec instanceof VectorPolynomial)) {
                throw new Error("Can only instanciate with polynomial vecors");
            }
        })
        super(vectorLst);
    }

    static fromNumLists(...numLsts) {
        return new MatrixPolynomial(numLsts.map(numLst => VectorPolynomial.fromNumList(numLst)));
    }

    static getStandardMatrix(m, n) {
        const vectorLst = [];
        for (let i = 0; i < n; i++) {
            const colName = String.fromCharCode('a'.charCodeAt(0) + i);
            vectorLst.push(VectorPolynomial.getStandardVector(colName, m));
        }

        return new MatrixPolynomial(vectorLst);
    }

    mulPol(pol) {
        const resVectorLst = []
        for (const vector of this.vectorLst) {
            resVectorLst.push(vector.mulPol(pol));
        }

        return new MatrixPolynomial(resVectorLst);
    }

    getOpposite() {
        return this.mulPol(Polynomial.fromNumber(-1));
    }
}
