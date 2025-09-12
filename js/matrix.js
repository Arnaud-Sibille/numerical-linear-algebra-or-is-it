import { MatrixBase } from "./matrix_base.js";

export class Matrix extends MatrixBase {
    constructor(vectorLst) {
        vectorLst.forEach((vec) => {
            if (!(typeof vec !== 'number')) {
                throw new Error("Can only instanciate with numbers");
            }
        })
        super(vectorLst);
    }

    mulNumber(num) {
        const resVectorLst = []
        for (const vector of this.vectorLst) {
            resVectorLst.push(vector.mulNumber(num));
        }

        return new Matrix(resVectorLst);
    }

    getClassicalGSOrthogonalization() {
        
    }
}
