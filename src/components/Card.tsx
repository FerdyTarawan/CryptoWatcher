import React from "react"
import {Pressable} from "react-native"
import type {BoxProps} from "react-native-magnus"
import {Box} from "react-native-magnus"

export interface CardProps extends BoxProps {
  onPress?: () => void
}

const Card: React.FC<CardProps> = ({children, onPress, ...props}) => {
  return (
    <Pressable onPress={onPress}>
      <Box bg="white" my="lg" p="lg" rounded="md" shadow="xs" {...props}>
        {children}
      </Box>
    </Pressable>
  )
}

export default Card
