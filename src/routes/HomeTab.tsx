import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React from "react"
import {Icon} from "react-native-magnus"

import IndexScreen from "_screens/IndexScreen"
import MarketScreen from "_screens/MarketScreen"
import NewsScreen from "_screens/NewsScreen"

const Tab = createBottomTabNavigator()

const HomeTab: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Market"
      screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        component={MarketScreen}
        name="Market"
        options={{
          tabBarIcon: ({color}): React.ReactNode => (
            <Icon
              color={color}
              fontFamily="Feather"
              fontSize="2xl"
              name="bar-chart-2"
            />
          ),
        }}
      />
      <Tab.Screen
        component={NewsScreen}
        name="News"
        options={{
          tabBarIcon: ({color}): React.ReactNode => (
            <Icon
              color={color}
              fontFamily="Feather"
              fontSize="2xl"
              name="book"
            />
          ),
        }}
      />
      <Tab.Screen
        component={IndexScreen}
        name="Index"
        options={{
          tabBarIcon: ({color}): React.ReactNode => (
            <Icon
              color={color}
              fontFamily="Feather"
              fontSize="2xl"
              name="activity"
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeTab
