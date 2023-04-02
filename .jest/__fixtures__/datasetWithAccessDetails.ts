import { datasetAquarius } from './datasetAquarius'

export const asset: AssetExtended = {
  ...datasetAquarius,
  accessDetails: {
    templateId: 1,
    publisherMarketOrderFee: '0',
    type: 'fixed',
    addressOrId:
      '0x00e3b740e4d8bf6e97010ecb5b14d1b7efc0913bfa291fcf5adb8eb9e6c29e93',
    price: '3231343254',
    isPurchasable: true,
    isOwned: false,
    validOrderTx: null,
    baseToken: {
      address: '0x70E546c7a2cA4495cFcbE263a3b6D5ce68B2204C',
      name: 'Lisprocoin',
      symbol: 'LSP20',
      decimals: 18
    },
    datatoken: {
      address: '0x067e1e6ec580f3f0f6781679a4a5ab07a6464b08',
      name: 'Stupendous Orca Token',
      symbol: 'STUORC-59'
    }
  }
}
