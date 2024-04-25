const fs = require("fs");

async function main() {
    const basePath = "/contracts/facets/"
    let filePaths = fs.readdirSync("." + basePath);
    let abis = [];

    let abstracts = ["CoitonERC20.sol", "CoitonNFT.sol"];

    for (path of abstracts) {
        const jsonFile = path.replace("sol", "json");
        let json = fs.readFileSync(`./out/${path}/${jsonFile}`);
        json = JSON.parse(json);
        let finalAbi = JSON.stringify(json.abi);
        fs.writeFileSync(`abis/${jsonFile}`, finalAbi);
        console.log(`ABI written to abis/${jsonFile}`);


    }

    for (path of filePaths) {
        const jsonFile = path.replace("sol", "json");
        let json = fs.readFileSync(`./out/${path}/${jsonFile}`);
        json = JSON.parse(json);
        abis.push(...json.abi);
    }
    let finalAbi = JSON.stringify(abis);
    fs.writeFileSync("abis/diamond.json", finalAbi);

    console.log("ABI written to abis/diamond.json");
}

main().catch(console.log)