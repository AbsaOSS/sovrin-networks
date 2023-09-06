const {getGenesisFile, getGenesisFileContents} = require("../index");

describe('agent operations', () => {
    it('get path to sovrin mainnet', async () => {
        let file = getGenesisFile('sovrin-mainnet')
        expect(file).toMatch("/sovrin-networks/genesis/sovrin_mainnet.ndjson")
    })

    it('get path to sovrin testnet', async () => {
        let file = getGenesisFile('sovrin-testnet')
        expect(file).toMatch("/sovrin-networks/genesis/sovrin_testnet.ndjson")
    })

    it('get path to 127.0.0.1 local net', async () => {
        let file = getGenesisFile('127.0.0.1')
        expect(file).toMatch("/sovrin-networks/genesis/127.0.0.1.ndjson")
    })

    it('get content of sovrin mainnet', async () => {
        getGenesisFileContents('sovrin-mainnet')
    })

    it('get content of sovrin testnet', async () => {
        getGenesisFileContents('sovrin-testnet')
    })

    it('get content of 127.0.0.1', async () => {
        getGenesisFileContents('127.0.0.1')
    })
})
