import React, { ReactElement } from 'react'
import slugify from '@sindresorhus/slugify'
import styles from './InputElement.module.css'
import { InputProps } from '.'
import FilesInput from '../../molecules/FormFields/FilesInput'
import Terms from '../../molecules/FormFields/Terms'

export default function InputElement(props: InputProps): ReactElement {
  const { type, options, rows, name, value } = props

  switch (type) {
    case 'select':
      return (
        <select id={name} className={styles.select} name={name} {...props}>
          <option value="">---</option>
          {options &&
            options
              .sort((a: string, b: string) => a.localeCompare(b))
              .map((option: string, index: number) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
        </select>
      )
    case 'textarea':
      return (
        <textarea
          id={name}
          className={styles.input}
          rows={rows}
          name={name}
          {...props}
        />
      )
    case 'radio':
    case 'checkbox':
      return (
        <div className={styles.radioGroup}>
          {options &&
            options.map((option: string, index: number) => (
              <div className={styles.radioWrap} key={index}>
                <input
                  className={styles.radio}
                  id={slugify(option)}
                  type={type}
                  name={name}
                  {...props}
                />
                <label className={styles.radioLabel} htmlFor={slugify(option)}>
                  {option}
                </label>
              </div>
            ))}
        </div>
      )
    case 'files':
      return <FilesInput name={name} {...props} />
    case 'terms':
      return <Terms name={name} {...props} />
    default:
      return (
        <input
          id={name}
          className={styles.input}
          name={name}
          {...props}
          value={value || ''}
          type={type || 'text'}
        />
      )
  }
}