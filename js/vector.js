import { VectorBase } from "./vector_base.js";

export class Vector extends VectorBase {
    constructor(componentLst) {
        componentLst.forEach((comp) => {
            if (typeof comp !== 'number') {
                throw new Error("must instanciate with numbers");
            }
        });
        super(componentLst);
    }

    getEl() {
        const el = document.createElement("div");
        el.classList.add("vector");

        for (const comp of this.compLst) {
            const compEl = document.createElement("div");
            compEl.classList.add("component");
            compEl.textContent = comp.toFixed(4);
            el.appendChild(compEl);
        }

        return el;
    }

    get isZero() {
        for (const comp of this.compLst) {
            if (comp !== 0) return false;
        }
        return true;
    }

    getOpposite() {
        return this.mulNumber(-1);
    }

    mulNumber(num) {
        return new Vector(this.compLst.map(comp => comp * num));
    }

    static get0Vector(length) {
        return new Vector(Array(length).fill(0));
    }

    static add(vec1, vec2) {
        if (vec1.length !== vec2.length) {
            throw new Error("Cannot sum vectors of different length");
        }

        const rescompLst = []
        for (let i = 0; i < vec1.length; i++) {
            rescompLst.push(vec1.getComp(i) + vec2.getComp(i));
        }

        return new Vector(rescompLst);
    }

    static mul(vec1, vec2) {
        if (vec1.length !== vec2.length) {
            throw new Error("Cannot multiply vectors of different size.")
        }

        let res = 0;

        for (let i = 0; i < vec1.length; i++) {
            res += (vec1.getComp(i) * vec2.getComp(i));
        }
        
        return res;
    }

    get euclideanNorm() {
        return Math.sqrt(Vector.mul(this, this));
    }
}
