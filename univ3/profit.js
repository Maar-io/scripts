function findProfitableSwaps(entries) {

  let profitableSwaps = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      let entry1 = entries[i];
      let entry2 = entries[j];

      // Check if the pairs have the same tokens
      if (entry1.token0Symbol === entry2.token0Symbol && entry1.token1Symbol === entry2.token1Symbol) {
        // Calculate the profit
        console.log("checking" + entry1.id, entry1.token1Price + "-" + entry2.id, entry2.token1Price);
        let profit = (1000 * parseFloat(entry1.token1Price)) / parseFloat(entry2.token1Price) - 1000;

        if (profit > 0) {
          profitableSwaps.push({ entry1, entry2, profit });
        }
      }
    }
  }

  // Sort the profitable swaps in descending order of profit
  profitableSwaps.sort((a, b) => b.profit - a.profit);

  return profitableSwaps;
}
module.exports = { findProfitableSwaps };
