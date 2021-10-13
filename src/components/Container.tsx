import React from "react"
import type {RefreshControlProps} from "react-native"
import {SafeAreaView, StatusBar, useColorScheme} from "react-native"
import type {BoxProps, ScrollDivProps} from "react-native-magnus"
import {Box, ScrollDiv} from "react-native-magnus"
import {getStatusBarHeight} from "react-native-status-bar-height"

export interface ContainerProps extends BoxProps {
  children?: React.ReactNode
  refreshControl?: React.ReactElement<RefreshControlProps>
  scrollProps?: ScrollDivProps
}

const Container: React.FC<ContainerProps> = ({
  children,
  refreshControl,
  scrollProps,
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
      <ScrollDiv
        contentContainerStyle={contentContainerStyle}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={refreshControl}
        {...scrollProps}>
        <Box bg="white" flex={1} pt={getStatusBarHeight()} px="md" {...props}>
          {children}
        </Box>
      </ScrollDiv>
    </SafeAreaView>
  )
}

export default Container
