export default {
  accountEns: 'jellymcjellyfish.eth',
  accountEnsAvatar:
    'https://metadata.ens.domains/mainnet/avatar/jellymcjellyfish.eth',
  accountId: '0xD0355200111C2B21AAbC1a31552eCCDc5d4E905d',
  approvedBaseTokens: [
    {
      address: '0x70E546c7a2cA4495cFcbE263a3b6D5ce68B2204C',
      symbol: 'Lisprocoin',
      name: 'LSP20',
      decimals: 18
    }
  ],
  balance: { matic: '0', LSP20: '1000' },
  block: 7751969,
  chainId: 137,
  connect: jest.fn(),
  isSupportedOceanNetwork: true,
  isTestnet: true,
  logout: jest.fn(),
  networkData: { name: 'Görli', title: 'Ethereum Testnet Görli', chain: 'MATIC' },
  networkDisplayName: 'MATIC mainnet',
  networkId: 5,
  web3: { currentProvider: {} },
  web3Loading: false,
  web3Modal: { show: false, eventController: {}, connect: jest.fn() },
  web3Provider: {},
  web3ProviderInfo: {
    id: 'injected',
    name: 'MetaMask',
    logo: ''
  }
}
