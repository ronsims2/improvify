/**
 *
 * @param x - The number to round
 * @param place the number of place to round starting at the 10
 * @returns {string}
 */
export const round = (x, place) => {
    const num = String(x)
    const col = String(place)

    if (isNaN(parseInt(num)) || isNaN(parseInt(col))) {
        return
    }

    if (place < 10) {
        return
    }

    if (place > x) {
        return
    }

    const roundDecision = parseInt(num.substring(num.length - col.length, num.length))

    let solution = parseInt(num.substring(0, num.length - col.length + 1))

    solution = roundDecision > 5 ? solution + 1 : solution

    return `${solution}${Array(col.length - 1).fill('0').join('')}`
}