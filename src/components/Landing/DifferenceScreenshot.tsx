import { classnames } from 'classnames/tailwind'

const container = classnames(
  'overflow-hidden',
  'h-full',
  'mt-xxl',
  'relative',
  'justify-center',
  'flex',
  'w-full',
  'h-screenshotContainer',
  'w-screenshotContainer'
)
const screen = classnames(
  'transform-gpu',
  'w-screenshot',
  'h-screenshot',
  'absolute',
  'mt-xxl',
  'rounded-xxl'
)
const blueScreen = classnames(
  'bg-screenshot-blue',
  'rotate-screenshotBlue',
  screen
)
const yellowScreen = classnames(
  'bg-screenshot-yellow',
  'rotate-screenshotYellow',
  screen
)
const frame = classnames('flex', 'absolute', 'mt-xxl')

const DifferenceScreenshot = () => {
  return (
    <div className={container}>
      <div className={blueScreen} />
      <div className={yellowScreen} />
      <img alt="Screenshot" src="/img/screenshots/en.webp" className={frame} />
    </div>
  )
}

export default DifferenceScreenshot