import { LoggerInstance } from '@oceanprotocol/lib'
import { createClient, erc20ABI } from 'wagmi'
import { mainnet, polygon, bsc, goerli, polygonMumbai } from 'wagmi/chains'
import { ethers } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { getDefaultClient } from 'connectkit'

// Wagmi client
export const wagmiClient = createClient(
  getDefaultClient({
    appName: 'Ocean Market',
    infuraId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
    chains: [mainnet, polygon, bsc, goerli, polygonMumbai]
  })
)

export function accountTruncate(account: string): string {
  if (!account || account === '') return
  const middle = account.substring(6, 38)
  const truncated = account.replace(middle, '…')
  return truncated
}

export async function addTokenToWallet(
  address: string,
  symbol: string,
  logo?: string
): Promise<void> {
  const image =
    logo ||
    'https://raw.githubusercontent.com/oceanprotocol/art/main/logo/token.png'

  const tokenMetadata = {
    type: 'ERC20',
    options: { address, symbol, image, decimals: 18 }
  }

  ;(window?.ethereum.request as any)(
    {
      method: 'wallet_watchAsset',
      params: tokenMetadata,
      id: Math.round(Math.random() * 100000)
    },
    (err: { code: number; message: string }, added: any) => {
      if (err || 'error' in added) {
        LoggerInstance.error(
          `Couldn't add ${tokenMetadata.options.symbol} (${
            tokenMetadata.options.address
          }) to MetaMask, error: ${err.message || added.error}`
        )
      } else {
        LoggerInstance.log(
          `Added ${tokenMetadata.options.symbol} (${tokenMetadata.options.address}) to MetaMask`
        )
      }
    }
  )
}

export async function getTokenBalance(
  accountId: string,
  decimals: number,
  tokenAddress: string,
  web3Provider: ethers.providers.Provider
): Promise<string> {
  if (!web3Provider) return

  try {
    const token = new ethers.Contract(tokenAddress, erc20ABI, web3Provider)
    const balance = await token.balanceOf(accountId)
    const adjustedDecimalsBalance = `${balance}${'0'.repeat(18 - decimals)}`
    return formatEther(adjustedDecimalsBalance)
  } catch (e) {
    LoggerInstance.error(`ERROR: Failed to get the balance: ${e.message}`)
  }
}

export function getTokenBalanceFromSymbol(
  balance: UserBalance,
  symbol: string
): string {
  if (!symbol) return

  const baseTokenBalance = balance?.[symbol.toLocaleLowerCase()]
  return baseTokenBalance || '0'
}