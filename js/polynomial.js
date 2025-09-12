import { Monomial } from "./monomial.js";
import { cleanSplit } from "./utils.js";

export class Polynomial {
    constructor(monomialLst) {
        this.monomialLst = [];

        for (let monomial of monomialLst) {
            if (!(monomial instanceof Monomial)) {
                throw new Error("Can only instanciate polynomial with monomials.");
            }
            if (monomial.coeff !== 0) {
                this.monomialLst.push(monomial);
            }
        }
        if (!this.monomialLst.length) {
            this.monomialLst.push(new Monomial(0, {}))
        }
    }

    static fromNumber(a) {
        return new Polynomial([new Monomial(a)]);
    }

    static fromVariable(variable) {
        const varToPowerMap = {};
        varToPowerMap[variable] = 1;
        return new Polynomial([new Monomial(1, varToPowerMap)]);
    }

    static fromString(polStr) {
        const tokens = cleanSplit(polStr, '+');
        return new Polynomial(tokens.map(token => Monomial.fromString(token)));
    }

    toString() {
        return this.monomialLst.join(' + ');
    }

    getEl() {
        const el = document.createElement("div");
        el.classList.add("polynomial");

        for (const mon of this.monomialLst) {
            el.appendChild(mon.getEl());

            const operator = document.createElement("span");
            operator.classList.add("operator");
            operator.textContent = '+';
            el.appendChild(operator);
        }
        if (el.lastChild) el.lastChild.remove();

        return el;
    }

    get isZero() {
        return this.monomialLst.length === 1 && this.monomialLst[0].isZero;
    }

    getOpposite() {
        return this.mulMon(new Monomial(-1));
    }

    static isEqual(pol1, pol2) {
        return Polynomial.add(pol1, pol2.getOpposite()).isZero;
    }

    addMon(mon) {
        const monLst = this.monomialLst;
        for (let i = 0; i < monLst.length; i++) {
            const sumMon = Monomial.add(monLst[i], mon);
            if (sumMon !== undefined) {
                return new Polynomial([
                    ...monLst.slice(0, i),
                    sumMon,
                    ...monLst.slice(i + 1),
                ]);
            }
        }
        return new Polynomial([...monLst, mon]);
    }

    static add(pol1, pol2) {
        let resPol = new Polynomial(pol1.monomialLst);

        for (let mon of pol2.monomialLst) {
            resPol = resPol.addMon(mon);
        }

        return resPol;
    }

    mulMon(mon) {
        return new Polynomial(this.monomialLst.map(monToMul => Monomial.mul(monToMul, mon)));
    }

    static mul(pol1, pol2) {
        let resPol = Polynomial.fromNumber(0);

        for (let mon2 of pol2.monomialLst) {
            resPol = Polynomial.add(resPol, pol1.mulMon(mon2));
        }

        return resPol;
    }
}
