import { FC } from 'react'
import { TArg, classnames } from 'classnames/tailwind'

type TextProps = {
  textArray: string[]
}

const basicText = classnames('font-BodyText')

const orangeBoxTitle = classnames(
  'items-start',
  'text-xl',
  'font-extrabold',
  'font-BodyText',
  'text-white'
)
const orangeBoxList = classnames(
  'items-start',
  'text-base',
  'font-medium',
  'pt-lg',
  'font-BodyText',
  'list-disc',
  'list-inside',
  'text-white'
)
const landingBodyTitle = classnames(
  'items-start',
  'text-xxl',
  'font-bold',
  'font-BodyText'
)
const landingBodyText = (margin?: TArg) =>
  classnames(
    'items-start',
    'text-lg',
    'font-normal',
    'font-BodyText',
    'text-black',
    'text-opacity-80',
    'whitespace-pre-line',
    margin
  )
const link = classnames(
  'font-BodyText',
  'text-screenshot-blue',
  'font-semibold',
  'text-sm',
  'underline'
)

const modalHeaderTitle = classnames(basicText, 'font-medium', 'text-xl')

const modalText = classnames(basicText, 'text-gray-500')

export const OrangeBoxTitle: FC<TextProps> = ({ textArray }) => {
  return (
    <div className={orangeBoxTitle}>
      {textArray.map((text) => (
        <p>{text}</p>
      ))}
    </div>
  )
}
export const OrangeBoxList: FC<TextProps> = ({ textArray }) => {
  return (
    <ul className={orangeBoxList}>
      {textArray.map((text) => (
        <li>{text}</li>
      ))}
    </ul>
  )
}
export const LandingBodyTitle: FC<{ text: string }> = ({ text }) => {
  return <p className={landingBodyTitle}>{text}</p>
}
export const LandingBodyText: FC<TextProps & { margin?: TArg }> = ({
  textArray,
  margin,
}) => {
  return (
    <>
      {textArray.map((text) => (
        <p className={landingBodyText(margin)}>{text}</p>
      ))}
    </>
  )
}

export const ModalHeaderTitle: FC<{ text: string }> = ({ text }) => {
  return <div className={modalHeaderTitle}>{text}</div>
}

export const ModalText: FC<{ text?: string }> = ({ children, text }) => {
  return <div className={modalText}>{children || text}</div>
}

export const Link: FC<{ url: string; text: string }> = ({ url, text }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener" className={link}>
      {text}
    </a>
  )
}
