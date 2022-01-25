import { LandingBodyText, LandingBodyTitle } from 'components/Text'
import { classnames } from 'classnames/tailwind'
import { useLocalize } from '@borodutch-labs/localize-react'

const block = classnames('flex', 'flex-col', 'max-w-xl', 'mt-8')

const DifferenceTextBlock = () => {
  const { translate } = useLocalize()
  return (
    <div className={block}>
      <LandingBodyTitle text={translate('homeShort.differenceTitle')} />
      <LandingBodyText
        textArray={[
          translate('homeShort.differenceText1'),
          translate('homeShort.differenceText2'),
          translate('homeShort.differenceText3'),
        ]}
        margin="mt-6"
      />
    </div>
  )
}

export default DifferenceTextBlock
