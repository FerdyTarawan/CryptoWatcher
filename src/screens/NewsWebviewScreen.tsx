import type {RouteProp} from "@react-navigation/core"
import {useRoute} from "@react-navigation/core"
import React from "react"
import {useTranslation} from "react-i18next"
import {StyleSheet} from "react-native"
import {Box, Header, Text} from "react-native-magnus"
import {WebView} from "react-native-webview"

import BackButton from "_components/BackButton"
import type {AppStackParamList} from "_routes/AppRoutes"

const style = StyleSheet.create({
  webview: {flex: 1, minHeight: 200, opacity: 0.99},
})

const NewsWebviewScreen: React.FC = () => {
  const {t} = useTranslation()
  const {params} = useRoute<RouteProp<AppStackParamList, "NewsWebview">>()

  return (
    <Box>
      <Header alignment="center" p="md" prefix={<BackButton />}>
        <Text fontSize="lg" fontWeight="bold">
          {t("news.detailTitle")}
        </Text>
      </Header>
      <Box h="100%" w="100%">
        <WebView
          androidLayerType="hardware"
          source={{uri: params.sourceUrl}}
          style={style.webview}
        />
      </Box>
    </Box>
  )
}

export default NewsWebviewScreen
