import React from "react"
import {useTranslation} from "react-i18next"
import {Box, Text} from "react-native-magnus"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import RNSpeedometer from "react-native-speedometer"

const labelWrapperStyle = {height: 0, width: 0}

export type FearAndGreedMeterProps = {
  hideValueText?: boolean
  lastUpdated: string
  size?: number
  value: number
  valueClassification: string
}

const FearAndGreedMeter: React.FC<FearAndGreedMeterProps> = ({
  hideValueText,
  lastUpdated,
  size,
  value,
  valueClassification,
}) => {
  const {t} = useTranslation()

  return (
    <Box pt="lg">
      <RNSpeedometer
        labelWrapperStyle={labelWrapperStyle}
        size={size}
        value={value}
      />

      {hideValueText !== true && (
        <Text fontSize="xl" fontWeight="bold" mt="md" textAlign="center">
          {value.toString()}
        </Text>
      )}

      <Text fontSize="xl" fontWeight="bold" mt="md" textAlign="center">
        {valueClassification}
      </Text>

      <Text fontSize="md" fontWeight="normal" mt="md" textAlign="center">
        {`${t("index.lastUpdatedAt")}: ${lastUpdated}`}
      </Text>
    </Box>
  )
}

FearAndGreedMeter.defaultProps = {
  hideValueText: false,
  size: 300,
}

export default FearAndGreedMeter
