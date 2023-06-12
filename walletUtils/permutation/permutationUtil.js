function* permute(array, start = 0) {
  if (start === array.length - 1) {
    yield [...array];
  } else {
    for (let i = start; i < array.length; i++) {
      [array[start], array[i]] = [array[i], array[start]]; // Swap elements
      yield* permute(array, start + 1); // Recursively generate permutations for the remaining elements
      [array[start], array[i]] = [array[i], array[start]]; // Revert the swap
    }
  }
}

module.exports = { permute };
