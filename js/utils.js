export function cleanSplit(strToSplit, sep) {
    return strToSplit.split(sep)
                     .map(token => token.trim())
                     .filter(token => token !== '');
}

export function expandListWithZeros(lst, targetLength) {
    const currentLength = lst.length;
    if (currentLength < targetLength) {
        return [...lst, ...Array(targetLength - currentLength).fill(0)];
    }
    return lst;
}
