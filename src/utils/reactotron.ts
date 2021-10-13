import AsyncStorage from "@react-native-async-storage/async-storage"
import Reactotron from "reactotron-react-native"

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
Reactotron.setAsyncStorageHandler!(AsyncStorage)
  .configure()
  .useReactNative()
  .connect()
