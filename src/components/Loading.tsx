import React from "react"
import type {ActivityIndicatorProps} from "react-native"
import {ActivityIndicator} from "react-native"
import {Box} from "react-native-magnus"

export interface LoadingProps extends ActivityIndicatorProps {}

const Loading: React.FC<LoadingProps> = ({...props}) => {
  return (
    <Box
      alignItems="center"
      bg="white"
      h="100%"
      justifyContent="center"
      w="100%">
      <ActivityIndicator {...props} />
    </Box>
  )
}

export default Loading
