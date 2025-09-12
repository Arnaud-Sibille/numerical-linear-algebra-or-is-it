export class VectorBase {
    constructor(componentLst) {
        this.compLst = componentLst;
    }

    toString() {
        return this.compLst.join(',')
    }

    getComp(index) {
        return this.compLst[index];
    }

    get isZero() {
        throw new Error("Not implemented");
    }

    getOpposite() {
        throw new Error("Not implemented");
    }

    static isEqual(vec1, vec2) {
        return this.add(vec1, vec2.getOpposite()).isZero;
    }

    get length() {
        return this.compLst.length;
    }

    static areOrthogonals(vec1, vec2) {
        return this.mul(vec1, vec2).isZero;
    }
}
