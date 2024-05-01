function findProfitableSwaps(entries, swappingValue) {

  let profitableSwaps = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      let entry1 = entries[i];
      let entry2 = entries[j];

      // Check if the pairs have the same tokens
      if (entry1.token0Symbol === entry2.token0Symbol && entry1.token1Symbol === entry2.token1Symbol) {
        // Calculate the profit
        console.log("checking" + entry1.id, entry1.token1Price + "-" + entry2.id, entry2.token1Price);

        // Calculate the amount you get after swapping in the first market
        let amountAfterSwap1 = swappingValue * parseFloat(entry1.token1Price);

        // Subtract the fee
        let amountAfterFee1 = amountAfterSwap1 - (amountAfterSwap1 * entry1.fee / 10000);

        // Calculate the amount you get after swapping in the second market
        let amountAfterSwap2 = amountAfterFee1 / parseFloat(entry2.token1Price);

        // Subtract the fee
        let amountAfterFee2 = amountAfterSwap2 - (amountAfterSwap2 * entry2.fee / 10000);

        // Calculate the profit
        let profit = amountAfterFee2 - swappingValue;
        console.log("profit", profit);
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
