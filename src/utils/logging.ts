/* eslint-disable @typescript-eslint/no-unused-vars */
import reactotron from "reactotron-react-native"

export const log = (...args: unknown[]): void => {
  reactotron.log?.(...args)
}

export const warn = (message: unknown): void => {
  reactotron.warn?.(message)
}

export const error = (message: unknown, stack: unknown): void => {
  reactotron.error?.(message, stack)
}
