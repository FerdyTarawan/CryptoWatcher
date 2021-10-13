import React from "react"
import {useTranslation} from "react-i18next"
import {Box, Text} from "react-native-magnus"

import Container from "_components/Container"
import FearAndGreedMeter from "_components/FearAndGreedMeter"
import Loading from "_components/Loading"
import useFnGIndex from "_hooks/useFnGIndex"

const IndexScreen: React.FC = () => {
  const {t} = useTranslation()
  const {data, isLoading} = useFnGIndex()
  const isScreenLoading = isLoading && data === undefined

  if (isScreenLoading) {
    return <Loading size="large" />
  }

  return (
    <Container>
      <Text fontSize="4xl" fontWeight="bold" textAlign="center">
        {t("index.title")}
      </Text>
      <Box pt="xl">
        <FearAndGreedMeter
          lastUpdated={data?.timestamp ?? ""}
          value={data?.value ?? 0}
          valueClassification={data?.value_classification ?? ""}
        />
      </Box>
      <Box p="md" pt="xl">
        <Text fontSize="2xl" fontWeight="bold">
          {t("index.faq.question_1")}
        </Text>
        <Text fontSize="lg" mt="md" textAlign="justify">
          {t("index.faq.answer_1")}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" mt="lg">
          {t("index.faq.question_2")}
        </Text>
        <Text fontSize="lg" mt="md" textAlign="justify">
          {t("index.faq.answer_2")}
        </Text>
      </Box>
    </Container>
  )
}

export default IndexScreen
