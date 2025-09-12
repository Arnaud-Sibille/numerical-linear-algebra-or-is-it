export function cleanSplit(strToSplit, sep) {
    return strToSplit.split(sep)
                     .map(token => token.trim())
                     .filter(token => token !== '');
}
