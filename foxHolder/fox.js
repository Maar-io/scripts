const axios = require('axios');
const fs = require('fs');

let addresses = new Set(); // Use a Set to store unique addresses
const GRAPH_ENDPOINT = 'https://api.studio.thegraph.com/query/68002/yoki-origins/version/latest';

const fetchPage = async (skip, fromTime, toTime) => {
    const response = await axios.post(GRAPH_ENDPOINT, {
        query: `
        query MyQuery($first: Int, $skip: Int, $fromTime: BigInt, $toTime: BigInt) {
                transferSingles(
                    first: $first,
                    skip: $skip,
                    where: {
                        and: [
                            {from: "0x0000000000000000000000000000000000000000"},
                            {Yokis_id: "100"},
                            {blockTimestamp_gte: $fromTime, blockTimestamp_lte: $toTime }
                        ]
                    }
                ) {
                    to 
                    blockTimestamp
                }
            }
    `,
        variables: {
            first: 1000,
            skip: skip,
            fromTime: fromTime,
            toTime: toTime
        }
    });

    if (response.data.data && response.data.data.transferSingles && response.data.data.transferSingles.length > 0) {
        const newAddresses = response.data.data.transferSingles.map(single => single.to);
        newAddresses.forEach(address => addresses.add(address));
        console.log('Unique addresses:', addresses.size);
        console.log('last timestamp:', response.data.data.transferSingles[response.data.data.transferSingles.length - 1].blockTimestamp);
        return {
            lastTimestamp: response.data.data.transferSingles[response.data.data.transferSingles.length - 1].blockTimestamp,
            totalPages: Math.ceil(response.data.data.transferSingles.length / 1000)
        };
    }
    else {
        console.error('Error fetching data:', response.data);
        return null; // Return toTime to stop the loop in case of error
    }
};

const fetchAllPages = async () => {
    let loop = 1;
    let fromTimestamp = "1710975600"; // Start from the initial fromTime
    const SECONDS_IN_A_WEEK = 604800; // 60 seconds * 60 minutes * 24 hours * 7 days
    const SECONDS_IN_A_DAY = 86400;
    const END_TIMESTAMP = "1714586400"; // Unix timestamp for May 1st, 2024

    while (true) {
        let skip = 0; // Reset skip for each new set of fromTime and toTime
        
        // Add one week to lastTimestamp
        fromTimestamp = (parseInt(fromTimestamp) + SECONDS_IN_A_DAY).toString();
        let toTime = (parseInt(fromTimestamp) + SECONDS_IN_A_DAY).toString();
        
        // If toTime exceeds END_TIMESTAMP, end loop
        if (parseInt(toTime) > parseInt(END_TIMESTAMP)) {
            console.log('toTime exceeds END_TIMESTAMP');
            break
        }
        
        let date = new Date(parseInt(fromTimestamp) * 1000);
        console.log('skip', skip, 'Fetching page:', loop, 'from', date.toUTCString(), 'to', new Date(parseInt(toTime) * 1000).toUTCString());
        loop++;

        let check = await fetchPage(0, fromTimestamp, toTime);
        if (check !== null && check.totalPages > 1) {
            console.log('WARNING, more data to fetch');
        }
    }
};


fetchAllPages().then(() => {
    console.log('Unique addresses:', addresses.size);
    const addressesArray = Array.from(addresses);
    const csvContent = addressesArray.join('\n');
    fs.writeFileSync('foxMinters.csv', csvContent);
}).catch(console.error);