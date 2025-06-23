import configPromise from "@payload-config"
import { betterAuth } from "better-auth"
import { headers } from "next/headers"
import { withPayloadAuth } from "payload-auth/better-auth"

export const auth = betterAuth(
  withPayloadAuth({
    payloadConfig: await configPromise
  })
)

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  return session
}
