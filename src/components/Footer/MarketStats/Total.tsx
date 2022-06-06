import React, { ReactElement } from 'react'
import Conversion from '@shared/Price/Conversion'
import PriceUnit from '@shared/Price/PriceUnit'
import { StatsTotal } from './_types'
import { useUserPreferences } from '@context/UserPreferences'
import { usePrices } from '@context/Prices'

export default function MarketStatsTotal({
  total
}: {
  total: StatsTotal
}): ReactElement {
  const { locale, currency } = useUserPreferences()
  const { prices } = usePrices()
  return (
    <>
      <p>
        <strong>{total.orders}</strong> orders across{' '}
        <strong>{total.nfts}</strong> assets with{' '}
        <strong>{total.datatokens}</strong> different datatokens.
      </p>
      <Conversion
        price={`${total.totalValueLockedInOcean}`}
        hideApproximateSymbol
        locale={locale}
        currency={currency}
        prices={prices}
      />{' '}
      <abbr title="Total Value Locked">TVL</abbr> across{' '}
      <strong>{total.pools}</strong> asset pools that contain{' '}
      <PriceUnit
        price={`${total.totalOceanLiquidity}`}
        symbol="OCEAN"
        size="small"
        locale={locale}
        currency={currency}
        prices={prices}
      />
      , plus datatokens for each pool.
    </>
  )
}
