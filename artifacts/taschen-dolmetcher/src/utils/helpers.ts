export function randInt(max: number): number {
  return Math.floor(Math.random() * max)
}

function randIntInclusive(min: number, max: number): number {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const minCeil = Math.ceil(min)
  const maxFloor = Math.floor(max)
  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil)
}

export function knuthRandomizer(input: any[]): any[] {
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (let i = input.length - 1; i > 0; --i) {
    const j = randIntInclusive(0, i)
    const middle = input[i]
    input[i] = input[j]
    input[j] = middle
  }
  return input
}

export default knuthRandomizer;
