export class MatrixBase {
    constructor(vectorLst) {
        this.vectorLst = [];
        if (!vectorLst) {
            throw new Error("Cannot create empty matrix.")
        }
        let vecDimension = vectorLst[0].length;
        for (let vec of vectorLst){
            if (vec.length !== vecDimension) {
                throw new Error("All vectors must be of same dimension");
            }
            this.vectorLst.push(vec);
        }
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

    get vectorClass() {
        return this.vectorLst[0].constructor;
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

    getComp(i, j) {
        return this.getVector(j).getComp(i);
    }

    getHermitian() {
        const resVectorLst = [];

        for (let i = 0; i < this.m; i++) {
            const compLst = []
            for (let j = 0; j < this.n ; j++) {
                compLst.push(this.getComp(i, j));
            }
            resVectorLst.push(new this.vectorClass(compLst));
        }

        return new this.constructor(resVectorLst);
    }

    get isZero() {
        for (let vec of this.vectorLst) {
            if (!vec.isZero) {
                return false;
            }
        }
        return true;
    }

    getOpposite () {
        newVectorLst = []

        this.vectorLst.forEach((vec) => {
            newVectorLst.push(vec.getOpposite());
        })

        return new this.constructor(newVectorLst);
    }

    static isEqual(mat1, mat2) {
        return this.add(mat1, mat2.getOpposite()).isZero;
    }

    static add(mat1, mat2) {
        if (mat1.n !== mat2.n) {
            throw new Error("matrices must have number of vectors for addition.");
        }

        const resVectorLst = [];
        for (let i = 0; i < mat1.n; i++) {
            resVectorLst.push(this.vectorClass.add(mat1.getVector(i), mat2.getVector(i)));
        }

        return new this(resVectorLst);
    }

    static mul(mat1, mat2) {
        const resVectorLst = [];
        for (const vec2 of mat2.vectorLst) {
            resVectorLst.push(mat1.mulVector(vec2));
        }

        return new this(resVectorLst);
    }

    isProjector() {
        const squared = this.mul(this, this);
        return this.isEqual(this, squared);
    }
}
