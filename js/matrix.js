import { MatrixBase } from "./matrix_base.js";
import { expandListWithZeros } from "./utils.js";
import { Vector } from "./vector.js";


export class Matrix extends MatrixBase {
    constructor(vectorLst) {
        vectorLst.forEach((vec) => {
            if (!(typeof vec !== 'number')) {
                throw new Error("Can only instanciate with numbers");
            }
        })
        super(vectorLst);
    }

    static fromNumLists(...numLsts) {
        return new Matrix(numLsts.map(numLst => new Vector(numLst)));
    }

    mulNumber(num) {
        const resVectorLst = []
        for (const vector of this.vectorLst) {
            resVectorLst.push(vector.mulNumber(num));
        }

        return new Matrix(resVectorLst);
    }

    mulVector(vec) {
        if (this.n !== vec.length) {
            throw new Error("Wrong dimensions for matrix vector multiplication.");
        }
        let resVector = this.vectorClass.get0Vector(this.m);
        for (let i = 0; i < this.n; i++) {
            resVector = this.vectorClass.add(resVector, this.vectorLst[i].mulNumber(vec.getComp(i)));
        }

        return resVector;
    }

    getClassicalGSOrthogonalization() {
        const Q = [];
        const R = [];

        for (const a of this.vectorLst) {
            let v = a;
            const rCompLst = [];
            for (const q of Q) {
                const rComp = Vector.mul(q, a);
                v = Vector.add(v, q.mulNumber(-rComp));
                rCompLst.push(rComp);
            }
            const vNorm = v.euclideanNorm;
            rCompLst.push(vNorm);
            Q.push(v.mulNumber(1 / vNorm));
            R.push(new Vector(expandListWithZeros(rCompLst, this.n)));
        }

        return [new Matrix(Q), new Matrix(R)];
    }
}
