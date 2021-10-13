import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import {useTranslation} from "react-i18next"
import {FlatList, Pressable} from "react-native"
import type {SelectRef} from "react-native-magnus"
import {Box, Button, Icon, Image, Select, Text} from "react-native-magnus"
import {getStatusBarHeight} from "react-native-status-bar-height"

import Card from "_components/Card"
import Container from "_components/Container"
import Loading from "_components/Loading"
import {CURRENCY_PAIRS} from "_constants/currency"
import useCurrency from "_hooks/useCurrencyStore"
import useMarketCoins, {
  defaultCoinListRequestParams,
} from "_hooks/useMarketCoins"
import useMarketOverview from "_hooks/useMarketOverview"
import {log} from "_utils/logging"

const MarketScreen: React.FC = () => {
  const {t} = useTranslation()
  const {changeCurrency, currency} = useCurrency()
  const overviewQuery = useMarketOverview(currency)
  const [coinsRequestParam, setCoinsRequestParam] = useState({
    ...defaultCoinListRequestParams,
    currency,
  })
  const coinsQuery = useMarketCoins(coinsRequestParam)
  const selectRef = createRef<SelectRef>()
  const isScreenLoading =
    (overviewQuery.isLoading || coinsQuery.isLoading) &&
    (overviewQuery.data === undefined || coinsQuery.data === undefined)

  const openSelectCurrency = useCallback((): void => {
    if (selectRef.current) {
      selectRef.current.open()
    }
  }, [selectRef])

  const nextCoinList = useCallback(
    (): void =>
      void setCoinsRequestParam({
        ...defaultCoinListRequestParams,
        currency,
        offset: coinsRequestParam.offset + coinsRequestParam.limit,
      }),
    [
      coinsRequestParam.limit,
      coinsRequestParam.offset,
      currency,
      setCoinsRequestParam,
    ],
  )

  const prevCoinList = useCallback(
    (): void =>
      void setCoinsRequestParam({
        ...defaultCoinListRequestParams,
        currency,
        offset: coinsRequestParam.offset - coinsRequestParam.limit,
      }),
    [
      coinsRequestParam.limit,
      coinsRequestParam.offset,
      currency,
      setCoinsRequestParam,
    ],
  )

  useEffect(() => {
    setCoinsRequestParam({
      ...defaultCoinListRequestParams,
      currency,
    })
  }, [currency])

  useEffect(() => {
    log(coinsQuery.data)
  }, [coinsQuery.data])

  const screenHeader = useMemo<React.ReactElement>(
    () => (
      <Box mt={getStatusBarHeight()}>
        <Text fontSize="2xl" fontWeight="bold">
          {t("market.overview.title")}
        </Text>
        <Box flex={1} flexDir="row" flexWrap="wrap" mt="xl">
          <Box alignItems="center" mb="lg" w="50%">
            <Text fontSize="lg" fontWeight="700">
              {overviewQuery?.data?.btcDominance ?? ""}
            </Text>
            <Text color="gray500">{t("market.overview.btcDom")}</Text>
          </Box>
          <Box alignItems="center" mb="lg" w="50%">
            <Text fontSize="lg" fontWeight="700">
              {overviewQuery?.data?.volume ?? ""}
            </Text>
            <Text color="gray500">{t("market.overview.volume")}</Text>
          </Box>
          <Box alignItems="center" mb="lg" w="50%">
            <Text fontSize="lg" fontWeight="700">
              {overviewQuery?.data?.cap ?? ""}
            </Text>
            <Text color="gray500">{t("market.overview.cap")}</Text>
          </Box>
          <Box alignItems="center" mb="lg" w="50%">
            <Text fontSize="lg" fontWeight="700">
              {overviewQuery?.data?.liquidity ?? ""}
            </Text>
            <Text color="gray500">{t("market.overview.liquidity")}</Text>
          </Box>
        </Box>

        <Box mt="lg">
          <Box flexDir="row" justifyContent="space-between">
            <Text fontSize="2xl" fontWeight="bold">
              {t("market.listing.title")}
            </Text>
            <Button
              bg="white"
              borderColor="indigo400"
              borderWidth={1}
              color="indigo400"
              onPress={openSelectCurrency}
              p="xs"
              rounded="circle"
              underlayColor="indigo100"
              w={80}>
              {currency}
            </Button>
          </Box>
        </Box>
      </Box>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currency, openSelectCurrency, t, overviewQuery?.data],
  )

  const screenFooter = useMemo<React.ReactElement>(
    () => (
      <Box flex={1} flexDir="row" justifyContent="space-around" my="md">
        <Button
          bg="white"
          borderColor="indigo400"
          borderWidth={1}
          color="indigo400"
          disabled={coinsRequestParam.offset === 0}
          onPress={prevCoinList}
          p="md"
          prefix={
            <Icon fontFamily="Feather" fontSize="2xl" name="arrow-left" />
          }
          rounded="circle"
          underlayColor="indigo100"
          w={100}>
          {t("common.prev")}
        </Button>
        <Button
          bg="white"
          borderColor="indigo400"
          borderWidth={1}
          color="indigo400"
          onPress={nextCoinList}
          p="md"
          rounded="circle"
          suffix={
            <Icon fontFamily="Feather" fontSize="2xl" name="arrow-right" />
          }
          underlayColor="indigo100"
          w={100}>
          {t("common.next")}
        </Button>
      </Box>
    ),
    [coinsRequestParam.offset, nextCoinList, prevCoinList, t],
  )

  if (isScreenLoading) {
    return <Loading size="large" />
  }

  return (
    <Box bg="white" flex={1} px="md">
      <FlatList
        ListFooterComponent={screenFooter}
        ListHeaderComponent={screenHeader}
        data={coinsQuery.data}
        keyExtractor={(item): string => item.code}
        renderItem={({item}): React.ReactElement => (
          <Card onPress={(): void => {}}>
            <Box flexDir="row" justifyContent="space-between" mt="md">
              <Box flexDir="row">
                <Image
                  h={40}
                  rounded="circle"
                  source={{uri: item.webp64}}
                  w={40}
                />
                <Box mx="lg">
                  <Text fontSize="md" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text fontSize="md">{item.code}</Text>
                </Box>
              </Box>

              <Text color="gray600" fontSize="xs" fontWeight="100">
                {item.rate}
              </Text>
            </Box>
          </Card>
        )}
      />

      <Select
        data={[...CURRENCY_PAIRS]}
        h={50}
        onSelect={changeCurrency}
        p="md"
        ref={selectRef}
        renderItem={(item, index): React.ReactElement => (
          <Select.Option
            key={index}
            prefix={<Icon fontFamily="Feather" fontSize="2xl" name="check" />}
            px="xl"
            py="md"
            value={item}>
            <Text>{item}</Text>
          </Select.Option>
        )}
        roundedTop="xl"
        title={t("market.listing.selectCurrency")}
        value={currency}
      />
    </Box>
  )
}

export default MarketScreen
