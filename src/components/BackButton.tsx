import {useNavigation} from "@react-navigation/core"
import React from "react"
import type {ButtonProps} from "react-native-magnus"
import {Button, Icon} from "react-native-magnus"

export interface BackButtonProps extends ButtonProps {}

const BackButton: React.FC<BackButtonProps> = props => {
  const {goBack} = useNavigation()

  return (
    <Button onPress={goBack} {...props}>
      <Icon fontFamily="Feather" fontSize="3xl" name="arrow-left" />
    </Button>
  )
}

BackButton.defaultProps = {
  bg: "transparent",
}

export default BackButton
