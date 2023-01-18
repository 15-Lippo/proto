// import App from "next/app";
import React, { ReactElement } from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import { UserPreferencesProvider } from '@context/UserPreferences'
import PricesProvider from '@context/Prices'
import UrqlProvider from '@context/UrqlProvider'
import ConsentProvider from '@context/CookieConsent'
import App from '../../src/components/App'
import '@oceanprotocol/typographies/css/ocean-typo.css'
import '../stylesGlobal/styles.css'
import Decimal from 'decimal.js'
import MarketMetadataProvider from '@context/MarketMetadata'
import { WagmiConfig } from 'wagmi'
import { Web3Modal } from '@web3modal/react'
import { wagmiClient, ethereumClient } from '@utils/web3'
import Web3Provider from '@context/Web3'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  Decimal.set({ rounding: 1 })
  return (
    <>
      <MarketMetadataProvider>
        <Web3Provider>
          <WagmiConfig client={wagmiClient}>
            <UrqlProvider>
              <UserPreferencesProvider>
                <PricesProvider>
                  <ConsentProvider>
                    <App>
                      <Component {...pageProps} />
                    </App>
                  </ConsentProvider>
                </PricesProvider>
              </UserPreferencesProvider>
            </UrqlProvider>
          </WagmiConfig>
        </Web3Provider>
      </MarketMetadataProvider>

      <Web3Modal
        projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
        ethereumClient={ethereumClient}
      />
    </>
  )
}

export default MyApp
