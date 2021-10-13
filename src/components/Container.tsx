import React from "react"
import type {RefreshControlProps} from "react-native"
import {SafeAreaView, ScrollView, StatusBar, useColorScheme} from "react-native"
import type {BoxProps} from "react-native-magnus"
import {Box} from "react-native-magnus"
import {getStatusBarHeight} from "react-native-status-bar-height"

export interface ContainerProps extends BoxProps {
  children?: React.ReactNode
  refreshControl?: React.ReactElement<RefreshControlProps>
}

const Container: React.FC<ContainerProps> = ({
  children,
  refreshControl,
  ...props
}) => {
  const isDarkMode = useColorScheme() === "dark"
  const contentContainerStyle = {flexGrow: 1}

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor="transparent"
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={refreshControl}>
        <Box bg="white" flex={1} pt={getStatusBarHeight()} px="md" {...props}>
          {children}
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Container
