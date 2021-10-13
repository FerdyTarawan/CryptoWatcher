import type {RouteProp} from "@react-navigation/core"
import {useNavigation, useRoute} from "@react-navigation/core"
import React from "react"
import {useTranslation} from "react-i18next"
import {StyleSheet} from "react-native"
import {Box, Button, Header, Icon, Text} from "react-native-magnus"
import {WebView} from "react-native-webview"

import type {AppStackParamList} from "_routes/AppRoutes"

const style = StyleSheet.create({
  webview: {flex: 1, minHeight: 200, opacity: 0.99},
})

const NewsWebviewScreen: React.FC = () => {
  const {t} = useTranslation()
  const {goBack} = useNavigation()
  const {params} = useRoute<RouteProp<AppStackParamList, "NewsWebview">>()

  return (
    <Box>
      <Header
        alignment="center"
        p="md"
        prefix={
          <Button bg="transparent" onPress={goBack}>
            <Icon fontFamily="Feather" fontSize="3xl" name="arrow-left" />
          </Button>
        }>
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
