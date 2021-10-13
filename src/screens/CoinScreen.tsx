import type {RouteProp} from "@react-navigation/core"
import {useRoute} from "@react-navigation/core"
import React, {createRef, useCallback, useState} from "react"
import {useTranslation} from "react-i18next"
import type {SelectRef} from "react-native-magnus"
import {
  Box,
  Button,
  Header,
  Icon,
  Image,
  ScrollDiv,
  Select,
  Text,
} from "react-native-magnus"
import {Currencies} from "ts-money"
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory-native"

import BackButton from "_components/BackButton"
import Loading from "_components/Loading"
import type {ChartIntervalOptions} from "_constants/chart"
import {CHART_INTERVAL_OPTIONS} from "_constants/chart"
import useCoin from "_hooks/useCoin"
import useCoinHistory from "_hooks/useCoinHistory"
import useCurrency from "_hooks/useCurrencyStore"
import type {AppStackParamList} from "_routes/AppRoutes"
import {
  calculatePriceChangePercentage,
  formatPriceChange,
  getStartUnixTime,
  getVerboseChartInterval,
  nowUnixMilis,
} from "_utils/chart"
import {Money, formatCurrency} from "_utils/money"
import {roundToTwo} from "_utils/numeric"

const CoinScreen: React.FC = () => {
  const {t} = useTranslation()
  const {params} = useRoute<RouteProp<AppStackParamList, "Coin">>()
  const {currency} = useCurrency()
  const [chartInterval, setChartInterval] = useState<ChartIntervalOptions>("1D")
  const selectRef = createRef<SelectRef>()
  const openSelectChartInterval = useCallback((): void => {
    if (selectRef.current) {
      selectRef.current.open()
    }
  }, [selectRef])

  const coinQuery = useCoin({code: params.code, currency, meta: true})
  const coinHistoryQuery = useCoinHistory({
    code: params.code,
    currency,
    end: nowUnixMilis,
    start: getStartUnixTime(chartInterval),
  })

  const isScreenLoading =
    (coinQuery.isLoading || coinHistoryQuery.isLoading) &&
    (coinQuery.data === undefined || coinHistoryQuery.data === undefined)
  const chartIntervalText = `${t("coin.chartInterval")}: ${chartInterval}`

  if (isScreenLoading) {
    return <Loading size="large" />
  }

  const allTimeHighUSD = Money.fromDecimal(
    roundToTwo(coinQuery.data?.allTimeHighUSD ?? 0),
    Currencies.USD,
  )
  const coinPrice = Money.fromDecimal(
    roundToTwo(coinQuery.data?.rate ?? 0),
    //@ts-ignore
    Currencies[currency],
  )
  const oldCoinPrice = Money.fromDecimal(
    roundToTwo(coinHistoryQuery.data?.[0]?.rate ?? 0),
    Currencies[currency],
  )
  const coinPriceChangePercentage = calculatePriceChangePercentage(
    coinPrice,
    oldCoinPrice,
  )
  const formattedCoinPrice = formatCurrency(coinPrice)

  return (
    <>
      <Header alignment="center" p="md" prefix={<BackButton />}>
        <Text fontSize="lg" fontWeight="bold">
          {params.code}
        </Text>
      </Header>
      <ScrollDiv bg="white" h="100%" p="lg">
        <Box flexDir="row" justifyContent="space-between" my="lg">
          <Box flexDir="row">
            <Image
              h={40}
              rounded="circle"
              source={{uri: coinQuery.data?.webp64}}
              w={40}
            />
            <Box mx="lg">
              <Text fontSize="xl" fontWeight="bold">
                {formattedCoinPrice}
              </Text>
              <Text fontSize="md" fontWeight="400">
                {coinQuery.data?.name}
              </Text>
            </Box>
          </Box>
          <Box
            alignItems="center"
            bg={coinPriceChangePercentage[2]}
            justifyContent="center"
            p="xs"
            rounded={10}>
            <Text color="white" fontSize="lg" fontWeight="400">
              {formatPriceChange(coinPriceChangePercentage)}
            </Text>
          </Box>
        </Box>

        <Button
          bg="white"
          borderColor="indigo400"
          borderWidth={1}
          color="indigo400"
          my="lg"
          onPress={openSelectChartInterval}
          p="md"
          rounded="circle"
          underlayColor="indigo100"
          w="100%">
          {chartIntervalText}
        </Button>

        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              labels={({datum}): string => `${datum.rate}`}
            />
          }
          padding={30}
          theme={VictoryTheme.material}>
          <VictoryLine data={coinHistoryQuery.data} x="date" y="rate" />
          <VictoryAxis
            style={{
              axis: {stroke: "transparent"},
              tickLabels: {fill: "transparent"},
              ticks: {stroke: "transparent"},
            }}
          />
        </VictoryChart>

        <Box my="2xl">
          <Text fontSize="2xl" fontWeight="bold">
            {t("coin.statistics")}
          </Text>
          <Box mt="xs">
            <Box flexDir="row" justifyContent="space-between" my="xs">
              <Text fontWeight="bold">{t("coin.cap")}</Text>
              <Text>{coinQuery.data?.cap ?? "N/A"}</Text>
            </Box>
            <Box flexDir="row" justifyContent="space-between" my="xs">
              <Text fontWeight="bold">{t("coin.volume")}</Text>
              <Text>{coinQuery.data?.volume ?? "N/A"}</Text>
            </Box>
            <Box flexDir="row" justifyContent="space-between" my="xs">
              <Text fontWeight="bold">{t("coin.circulatingSupply")}</Text>
              <Text>{coinQuery.data?.circulatingSupply ?? "N/A"}</Text>
            </Box>
            <Box flexDir="row" justifyContent="space-between" my="xs">
              <Text fontWeight="bold">{t("coin.maxSupply")}</Text>
              <Text>{coinQuery.data?.maxSupply ?? "N/A"}</Text>
            </Box>
            <Box flexDir="row" justifyContent="space-between" my="xs">
              <Text fontWeight="bold">{t("coin.totalSupply")}</Text>
              <Text>{coinQuery.data?.totalSupply ?? "N/A"}</Text>
            </Box>
            <Box flexDir="row" justifyContent="space-between" my="xs">
              <Text fontWeight="bold">{t("coin.allTimeHighUSD")}</Text>
              <Text>{formatCurrency(allTimeHighUSD)}</Text>
            </Box>
          </Box>
        </Box>
      </ScrollDiv>

      <Select
        data={[...CHART_INTERVAL_OPTIONS]}
        h={50}
        onSelect={setChartInterval}
        p="md"
        ref={selectRef}
        renderItem={(item, index): React.ReactElement => (
          <Select.Option
            key={index}
            prefix={<Icon fontFamily="Feather" fontSize="2xl" name="check" />}
            px="xl"
            py="md"
            value={item}>
            <Text>{getVerboseChartInterval(item)}</Text>
          </Select.Option>
        )}
        roundedTop="xl"
        title={t("coin.selectChartInterval")}
        value={chartInterval}
      />
    </>
  )
}

export default CoinScreen
