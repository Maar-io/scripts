function findProfitableSwaps(entries) {
    let profitableSwaps = [];
  
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        let entry1 = entries[i];
        let entry2 = entries[j];
  
        // Check if the pairs are reverse of each other
        if (entry1.pair === entry2.pair.split('-').reverse().join('-')) {
          // Calculate the profit
          let profit = (10 / entry1.outprice) * entry2.inprice - 10;
  
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

  export { findProfitableSwaps };