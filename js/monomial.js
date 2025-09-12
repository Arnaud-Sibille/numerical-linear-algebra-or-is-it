import { cleanSplit } from "./utils.js";

export class Monomial {
    constructor(coeff, varToPowerMapping = {}) {
        if (typeof coeff !== 'number') {
            throw new Error("coeff should be a number");
        }
        this.coeff = coeff;
        this.varToPowerMapping = {}
        for (const [variable, power] of Object.entries(varToPowerMapping)) {
            if (typeof variable !== 'string') {
                throw new Error("variable should be a string.");
            }
            if (typeof power !== 'number') {
                throw new Error("power should be a number.")
            }
            if (power !== 0) {
                this.varToPowerMapping[variable] = power;
            }
        }
    }

    static fromString(monStr) {
        const tokens = cleanSplit(monStr, ' ');
        const coeff = Number(tokens[0]);
        const varToPowerMap = {};
        tokens.slice(1).forEach(token => {
            const [variable, power] = token.split('^');
            varToPowerMap[variable] = Number(power) || 1;
        });
        
        return new Monomial(coeff, varToPowerMap);
    }

    toString() {
        const resLst = [this.coeff.toString()];

        const sortedVariables = Object.keys(this.varToPowerMapping).sort();
        for (const variable of sortedVariables) {
            const power = this.varToPowerMapping[variable];
            resLst.push(variable + ((power !== 1)? `^${power}`: ''));
        }

        return resLst.join(' ');
    }

    getEl() {
        const el = document.createElement("span");
        el.classList.add("monomial");
        const hasVariables = Object.keys(this.varToPowerMapping).length;

        const coeffEl = document.createElement("span")
        coeffEl.classList.add("coeff");
        if (!hasVariables || Math.abs(this.coeff) !== 1){
            coeffEl.textContent = this.coeff.toString();
        } else if (this.coeff === -1) {
            coeffEl.textContent = "-";
        }
        el.appendChild(coeffEl);

        for (const [variable, power] of Object.entries(this.varToPowerMapping)) {
            const variableEl = document.createElement("span");
            variableEl.classList.add("variable");
            variableEl.appendChild(document.createTextNode(variable));
            if (power !== 1) {
                const powerEl = document.createElement("sup");
                powerEl.classList.add("power");
                powerEl.textContent = power.toString();
                variableEl.appendChild(powerEl);
            }
            el.appendChild(variableEl);
        }

        return el;
    }

    get isZero() {
        return this.coeff === 0;
    }

    getOpposite() {
        return Monomial.mul(new Monomial(-1), this);
    }

    static isEqual(mon1, mon2) {
        return Monomial.add(mon1, mon2.getOpposite()).isZero;
    }

    static isSameFamily(mon1, mon2) {
        const mon1Map = mon1.varToPowerMapping;
        const mon2Map = mon2.varToPowerMapping;
        if (Object.keys(mon1Map).length !== Object.keys(mon2Map).length) {
            return false;
        }
        for (const variable in mon1Map) {
            if (mon1Map[variable] !== mon2Map[variable]) {
                return false;
            }
        }

        return true;
    }

    static add(mon1, mon2) {
        if (!(Monomial.isSameFamily(mon1, mon2))) {
            return undefined;
        }
        return new Monomial(mon1.coeff + mon2.coeff, mon1.varToPowerMapping);
    }

    static mul(mon1, mon2) {
        const resVarToPowerMapping = Object.assign({}, mon1.varToPowerMapping);

        for (const [variable, power] of Object.entries(mon2.varToPowerMapping)) {
            resVarToPowerMapping[variable] = power + (resVarToPowerMapping[variable] || 0);
        }

        return new Monomial(mon1.coeff * mon2.coeff, resVarToPowerMapping);
    }
}
