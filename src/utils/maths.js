/**
 *
 * @param x - The number to round
 * @param place the number of place to round starting at the 10
 * @returns {number}
 */
export const round = (x, place) => {
    const num = String(x)
    const col = String(place)

    if (isNaN(parseInt(num)) || isNaN(parseInt(col))) {
        return
    }

    if (place < 10) {
        return x
    }

    if (place > x) {
        return roundToLargerNumber(x, place)
    }

    const roundDeciderIndex = num.length - (col.length - 1)
    const roundDecision = parseInt(num[roundDeciderIndex])

    let solution = parseInt(num.substring(0, num.length - (col.length- 1)))

    solution = roundDecision >= 5 ? solution + 1 : solution
    const finalSolution = parseInt(`${solution}${Array(col.length - 1).fill('0').join('')}`)

    return finalSolution
}

const roundToLargerNumber = (x, place) => {
    const numString = String(x)
    const placeString = String(place)
    const placeDiff = placeString.length - numString.length

    if (placeDiff > 1) {
        return 0
    }

    const roundDecision = parseInt(numString[0]) >= 5 ? place : 0

    return roundDecision
}