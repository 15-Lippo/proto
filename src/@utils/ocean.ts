import { ConfigHelper, Config } from '@oceanprotocol/lib'
// import contractAddresses from '@oceanprotocol/contracts/artifacts/address.json'

export function getOceanConfig(network: string | number): Config {
  let config = new ConfigHelper().getConfig(
    network,
    network === 'polygon' ||
      network === 'moonbeamalpha' ||
      network === 1287 ||
      network === 'bsc' ||
      network === 56 ||
      network === 'gaiaxtestnet' ||
      network === 2021000 ||
      network === 8996 // barge
      ? undefined
      : process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
  ) as Config

  // TODO: remove after fixing in ocean.js
  // we need to hardcoded these values from Barge (see 'development' object in console)
  if (network === 8996) {
    config = {
      ...config,
      nodeUri: '',
      subgraphUri: '',
      chainId: 8996,
      network: '',
      metadataCacheUri: '',
      fixedRateExchangeAddress: '',
      dispenserAddress: '',
      oceanTokenAddress: '',
      nftFactoryAddress: '',
      providerUri: ''
    }
    console.log('barge config: ', config)
  }

  return config as Config
}

export function getDevelopmentConfig(): Config {
  return {
    // factoryAddress: contractAddresses.development?.DTFactory,
    // poolFactoryAddress: contractAddresses.development?.BFactory,
    // fixedRateExchangeAddress: contractAddresses.development?.FixedRateExchange,
    // metadataContractAddress: contractAddresses.development?.Metadata,
    // oceanTokenAddress: contractAddresses.development?.Ocean,
    // There is no subgraph in barge so we hardcode the Goerli one for now
    subgraphUri: 'https://v4.subgraph.goerli.oceanprotocol.com'
  } as Config
}
