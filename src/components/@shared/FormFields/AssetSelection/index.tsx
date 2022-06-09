import React, { ChangeEvent, useState } from 'react'
import Dotdotdot from 'react-dotdotdot'
import slugify from 'slugify'
import classNames from 'classnames/bind'
import PriceUnit from '@shared/Price/PriceUnit'
import External from '@images/external.svg'
import InputElement from '@shared/FormInput/InputElement'
import Loader from '@shared/atoms/Loader'
import styles from './index.module.css'
import { Prices } from '@context/Prices'

const cx = classNames.bind(styles)

export interface AssetSelectionAsset {
  did: string
  name: string
  price: string
  checked: boolean
  symbol: string
}

export interface AssetSelectionProps {
  assets: AssetSelectionAsset[]
  currency: string
  locale: string
  prices: Prices
  multiple?: boolean
  disabled?: boolean
}

function Empty() {
  return <div className={styles.empty}>No assets found.</div>
}

export default function AssetSelection({
  assets,
  multiple,
  disabled,
  currency,
  locale,
  prices,
  ...props
}: AssetSelectionProps): JSX.Element {
  const [searchValue, setSearchValue] = useState('')
  // const { locale } = useUserPreferences()

  const styleClassesInput = cx({
    input: true,
    [styles.checkbox]: multiple,
    [styles.radio]: !multiple
  })

  function handleSearchInput(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  return (
    <div className={`${styles.selection} ${disabled ? styles.disabled : ''}`}>
      <InputElement
        type="search"
        name="search"
        size="small"
        placeholder="Search by title, datatoken, or DID..."
        value={searchValue}
        onChange={handleSearchInput}
        className={styles.search}
        disabled={disabled}
      />
      <div className={styles.scroll}>
        {!assets ? (
          <Loader />
        ) : assets && !assets.length ? (
          <Empty />
        ) : (
          assets
            .filter((asset: AssetSelectionAsset) =>
              searchValue !== ''
                ? asset.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  asset.did.toLowerCase().includes(searchValue.toLowerCase()) ||
                  asset.symbol.toLowerCase().includes(searchValue.toLowerCase())
                : asset
            )
            .map((asset: AssetSelectionAsset) => (
              <div className={styles.row} key={asset.did}>
                <input
                  id={slugify(asset.did)}
                  className={styleClassesInput}
                  {...props}
                  defaultChecked={asset.checked}
                  type={multiple ? 'checkbox' : 'radio'}
                  disabled={disabled}
                  value={asset.did}
                />
                <label
                  className={styles.label}
                  htmlFor={slugify(asset.did)}
                  title={asset.name}
                >
                  <h3 className={styles.title}>
                    <Dotdotdot clamp={1} tagName="span">
                      {asset.name}
                    </Dotdotdot>
                    <a
                      className={styles.link}
                      href={`/asset/${asset.did}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <External />
                    </a>
                  </h3>

                  <Dotdotdot clamp={1} tagName="code" className={styles.did}>
                    {asset.symbol} | {asset.did}
                  </Dotdotdot>
                </label>

                <PriceUnit
                  price={asset.price}
                  type={asset.price === '0' ? 'free' : undefined}
                  size="small"
                  className={styles.price}
                  locale={locale}
                  prices={prices}
                  currency={currency}
                />
              </div>
            ))
        )}
      </div>
    </div>
  )
}