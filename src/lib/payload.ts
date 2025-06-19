import configPromise from '@payload-config'
import { getPayloadAuth } from 'payload-auth/better-auth'
import type { BetterAuthPlugins } from '@/modules/auth/lib/options' // important!

export const getPayload = async () => getPayloadAuth<BetterAuthPlugins>(configPromise)
