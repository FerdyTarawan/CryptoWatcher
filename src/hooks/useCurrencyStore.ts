import AsyncStorage from "@react-native-async-storage/async-storage"
import create from "zustand"
import {persist} from "zustand/middleware"

import type {CurrencyPairs} from "_constants/currency"

type State = {
  changeCurrency: (to: CurrencyPairs) => void
  currency: CurrencyPairs
}

const useCurrency = create<State>(
  persist(
    set => ({
      changeCurrency: (to): void => void set(_ => ({currency: to})),
      currency: "IDR",
    }),
    {getStorage: () => AsyncStorage, name: "currency-store"},
  ),
)

export default useCurrency
