import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import React from "react"

import HomeTab from "_routes/HomeTab"
import CoinScreen from "_screens/CoinScreen"
import NewsWebviewScreen from "_screens/NewsWebviewScreen"

export type AppStackParamList = {
  Coin: undefined
  Home: undefined
  NewsWebview: {sourceUrl: string}
}

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={HomeTab} name="Home" />
        <Stack.Screen component={CoinScreen} name="Coin" />
        <Stack.Screen component={NewsWebviewScreen} name="NewsWebview" />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes
