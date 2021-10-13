import {useNavigation} from "@react-navigation/core"
import type {NativeStackNavigationProp} from "@react-navigation/native-stack"
import React, {useCallback, useMemo} from "react"
import {useTranslation} from "react-i18next"
import {FlatList, RefreshControl} from "react-native"
import {Box, Text} from "react-native-magnus"
import {getStatusBarHeight} from "react-native-status-bar-height"

import Card from "_components/Card"
import Loading from "_components/Loading"
import useNews from "_hooks/useNews"
import type {AppStackParamList} from "_routes/AppRoutes"

const NewsScreen: React.FC = () => {
  const {t} = useTranslation()
  const {data, isLoading, queryClient} = useNews()
  const {navigate} =
    useNavigation<NativeStackNavigationProp<AppStackParamList, "Home">>()
  const isScreenLoading = isLoading && data === undefined

  const invalidateQuery = useCallback(() => {
    queryClient.invalidateQueries("news")
  }, [queryClient])

  const refreshControl = useMemo(
    () => <RefreshControl onRefresh={invalidateQuery} refreshing={isLoading} />,
    [invalidateQuery, isLoading],
  )

  if (isScreenLoading) {
    return <Loading size="large" />
  }

  return (
    <Box bg="white" flex={1} pt={getStatusBarHeight()} px="md">
      <Text fontSize="2xl" fontWeight="bold" mb="xl">
        {t("news.title")}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item): string => item.id.toString()}
        refreshControl={refreshControl}
        renderItem={({item}): React.ReactElement => (
          <Card
            onPress={(): void =>
              void navigate("NewsWebview", {sourceUrl: item.url})
            }>
            <Text fontSize="lg" fontWeight="bold">
              {item.title}
            </Text>
            <Box flexDir="row" justifyContent="space-between" mt="lg">
              <Text fontSize="md">{item.source.title}</Text>
              <Text color="gray600" fontSize="xs" fontWeight="100">
                {item.published_time_from_now}
              </Text>
            </Box>
          </Card>
        )}
      />
    </Box>
  )
}

export default NewsScreen
