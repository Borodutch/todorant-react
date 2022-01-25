import { DiskList, ModalHeaderTitle, ModalText } from 'components/Text'
import { FC, useRef, useState } from 'react'
import { TArg, classnames } from 'classnames/tailwind'
import { useLocalize } from '@borodutch-labs/localize-react'
import { useSnapshot } from 'valtio'
import AppStore from 'stores/AppStore'
import Language from 'models/Language'
import Modal from 'components/Modal'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import useClickOutside from 'hooks/useClickOutside'
import useDarkMode from 'hooks/useDarkMode'
import useEscape from 'hooks/useEscape'

type ButtonProps = {
  onClick: () => void
}
type LogoButtonProps = {
  onClick: () => void
  path: string
  alt: string
}

const iconButton = classnames(
  'flex',
  'justify-center',
  'items-center',
  'w-12',
  'h-12',
  'hover:bg-gray-500',
  'hover:bg-opacity-10',
  'text-gray-700',
  'focus:outline-none',
  'text-generalButton',
  'rounded-md',
  'font-BodyText',
  'font-medium',
  'whitespace-nowrap'
)

const signInBtn = classnames(
  'rounded-md',
  'px-11',
  'py-3',
  'ml-2',
  'font-BodyText',
  'text-lg',
  'text-white',
  'bg-button-signIn',
  'font-bold',
  'w-40',
  'h-12',
  'flex',
  'justify-center'
)
const storeBtn = classnames('rounded-md', 'w-14', 'h-12', 'ml-2')
const platformBtn = classnames(
  'rounded-lg',
  'w-24',
  'h-24',
  'm-2',
  'p-4',
  'bg-gray-500',
  'bg-opacity-5',
  'hover:bg-gray-500',
  'hover:bg-opacity-20',
  'flex',
  'flex-col',
  'justify-center',
  'items-center',
  'text-mainText'
)
const platformLogoContainer = classnames(
  'flex',
  'w-10',
  'h-10',
  'justify-center',
  'content-center'
)
const platformLogo = classnames('max-w-xs')
const platformTitle = classnames(
  'font-medium',
  'text-sm',
  'mt-2',
  'font-BodyText'
)
const circleButton = (opacity?: TArg) =>
  classnames(
    'rounded-full',
    'bg-gray-500',
    'w-2',
    'h-2',
    'm-2',
    'hover:opacity-100',
    opacity
  )

const logoBtn = classnames('w-28')

const regularButton = classnames(
  'flex',
  'justify-center',
  'items-center',
  'focus:outline-none',
  'rounded-md',
  'font-BodyText',
  'font-medium',
  'whitespace-nowrap',
  'p-3'
)

const dropdownContainer = classnames(
  'origin-top-right',
  'absolute',
  'right-0',
  'mt-2',
  'rounded-md',
  'shadow-lg',
  'bg-mainBackground',
  'ring-1',
  'ring-black',
  'ring-opacity-5',
  'focus:outline-none',
  'flex',
  'flex-col',
  'p-2'
)

export const LogoButton = () => {
  return (
    <button className={logoBtn}>
      <img src={'public/img/logo.svg'} />
    </button>
  )
}

const dropDownWrapper = classnames('relative', 'inline-block')
export const DropDownButton: FC<{
  text?: string
  img?: string
  ButtonHandler: FC<any>
}> = ({ children, ButtonHandler, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [showDropDown, setShowDropDown] = useState(false)

  const closeModal = () => setShowDropDown(false)

  useClickOutside(ref, closeModal)

  useEscape(ref, closeModal)

  return (
    <div ref={ref} className={dropDownWrapper}>
      <ButtonHandler
        {...props}
        onClick={() => {
          setShowDropDown(!showDropDown)
        }}
      />

      {showDropDown && (
        <div
          onClick={closeModal}
          className={dropdownContainer}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {children}
        </div>
      )}
    </div>
  )
}

const flags = {
  US: Language.en,
  RU: Language.ru,
  UA: Language.uk,
  ES: Language.es,
  IT: Language.it,
  RO: Language.ro,
  PT: Language.ptBR,
} as { [key: string]: Language }

export const LanguageButton: FC = () => {
  const { language } = useSnapshot(AppStore)

  return (
    <DropDownButton text={language.toUpperCase()} ButtonHandler={IconButton}>
      {Object.keys(flags).map((k) => (
        <IconButton
          key={flags[k]}
          onClick={() => {
            AppStore.language = flags[k]
          }}
        >
          {getUnicodeFlagIcon(k.toUpperCase())}
        </IconButton>
      ))}
    </DropDownButton>
  )
}

export const SettingsButton = () => {
  const [isDark, setIsDark] = useDarkMode()
  const { translate } = useLocalize()

  return (
    <DropDownButton img={'/img/settings.svg'} ButtonHandler={IconButton}>
      <GrayButton
        onClick={() => {
          setIsDark(!isDark)
        }}
      >
        {isDark
          ? translate('menu.darkMode.off')
          : translate('menu.darkMode.on')}
      </GrayButton>
    </DropDownButton>
  )
}

const iconImage = classnames('h-6')

export const IconButton: FC<ButtonProps & { text?: string; img?: string }> = ({
  onClick,
  text,
  img,
  children,
}) => {
  return (
    <button
      type="button"
      className={iconButton}
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      onClick={onClick}
    >
      {children || text}
      {img && <img src={img} className={iconImage} />}
    </button>
  )
}

export const SignInButton: FC<{ title: string }> = ({ title }) => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <>
      <button
        className={signInBtn}
        onClick={() => {
          setModalOpened(!modalOpened)
        }}
      >
        {title}
      </button>
      {modalOpened && (
        <Modal
          closeModal={() => setModalOpened(false)}
          header={<ModalHeaderTitle text={title} />}
          body={<div>{title}</div>}
        />
      )}
    </>
  )
}

export const StoreButton: FC<LogoButtonProps> = ({ onClick, path, alt }) => {
  return (
    <button className={storeBtn} onClick={onClick}>
      <img src={`/img/${path}.svg`} alt={alt} />
    </button>
  )
}

const blueButton = classnames(
  regularButton,
  'text-blue-500',
  'hover:bg-blue-500',
  'hover:bg-opacity-10',
  'uppercase'
)
export const BlueButton: FC<
  ButtonProps & {
    text?: string
  }
> = ({ onClick, text, children }) => {
  return (
    <button
      type="button"
      className={blueButton}
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      onClick={onClick}
    >
      {children || text}
    </button>
  )
}

const grayButton = classnames(
  regularButton,
  'text-gray-500',
  'hover:bg-gray-500',
  'hover:bg-opacity-10'
)
export const GrayButton: FC<
  ButtonProps & {
    text?: string
  }
> = ({ onClick, text, children }) => {
  return (
    <button
      type="button"
      className={grayButton}
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
      onClick={onClick}
    >
      {children || text}
    </button>
  )
}

const infoRules = classnames('mb-4')
const infoFooter = classnames('flex', 'justify-end')
export const InfoButton = () => {
  const [modalOpened, setModalOpened] = useState(false)
  const { translate } = useLocalize()

  const rules = translate('rules') as unknown as string[]
  const rulesEl = rules.map((_, index) => {
    return (
      <ModalText>
        {/* Hack to make localized array reactive. TODO: Fix internal of localize-react to make arrays reactive by default */}
        <li className={infoRules}>{translate(`rules.${index}`)}</li>
      </ModalText>
    )
  })

  return (
    <>
      <IconButton
        img={'/img/info.svg'}
        onClick={() => {
          setModalOpened(!modalOpened)
        }}
      />
      {modalOpened && (
        <Modal
          closeModal={() => setModalOpened(false)}
          header={<ModalHeaderTitle text={translate('howto.title')} />}
          body={<DiskList>{rulesEl}</DiskList>}
          footer={
            <div className={infoFooter}>
              <BlueButton
                onClick={() => setModalOpened(false)}
                text={translate('cookie.button')}
              />
            </div>
          }
        />
      )}
    </>
  )
}
export const PlatformButton: FC<LogoButtonProps & { title: string }> = ({
  onClick,
  path,
  alt,
  title,
}) => {
  return (
    <button className={platformBtn} onClick={onClick}>
      <div className={platformLogoContainer}>
        <img
          src={`/img/platforms/${path}.svg`}
          alt={alt}
          className={platformLogo}
        />
      </div>
      <p className={platformTitle}>{title}</p>
    </button>
  )
}

export const CircleButton: FC<{ onClick: () => void; inactive?: boolean }> = ({
  onClick,
  inactive,
}) => {
  let opacity: TArg = 'opacity-50'
  if (inactive) opacity = 'opacity-30'
  return <button className={circleButton(opacity)} onClick={onClick} />
}
