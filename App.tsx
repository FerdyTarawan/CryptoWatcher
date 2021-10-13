import React from "react"
import {ThemeProvider} from "react-native-magnus"
import {QueryClient, QueryClientProvider} from "react-query"

import AppRoutes from "_routes/AppRoutes"
import "_locales/i18n"

if (__DEV__) {
  require("_utils/reactotron")
}

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
