import { platform } from "node:os"
import { nextCookies } from "better-auth/next-js"
import {
  admin,
  emailOTP,
  magicLink,
  multiSession,
  openAPI,
  organization,
  phoneNumber,
  twoFactor,
  username
} from "better-auth/plugins"
import { passkey } from "better-auth/plugins/passkey"
import { emailHarmony, phoneHarmony } from "better-auth-harmony"
import type {
  BetterAuthOptions,
  BetterAuthPluginOptions
} from "payload-auth/better-auth"

export const betterAuthPlugins = [
  username(),
  emailHarmony(),
  // phoneHarmony({
  //   defaultCountry: 'CA'
  // }),
  twoFactor({
    issuer: "payload-stack",
    otpOptions: {
      async sendOTP({ user, otp }) {
        console.log("Send OTP for user: ", user, otp)
      }
    }
  }),
  // phoneNumber({
  //   sendOTP: async ({ phoneNumber, code }, req) => {
  //     console.log('Send OTP for user: ', phoneNumber, code)
  //   }
  // }),
  magicLink({
    sendMagicLink: async ({ email, token, url }, request) => {
      console.log("Send magic link for user: ", email, token, url)
    }
  }),
  emailOTP({
    async sendVerificationOTP({ email, otp, type }) {
      console.log("Send verification OTP for user: ", email, otp, type)
    },
    sendVerificationOnSignUp: true
  }),
  passkey({
    rpID: "localhost",
    rpName: "Localhost",
    origin: "http://localhost:3000"
    // authenticatorSelection: {
    //   authenticatorAttachment: {
    //     platform: 'fingerprint',

    //   }
    // }
  }),
  admin(),
  organization({
    teams: {
      enabled: true
    },
    async sendInvitationEmail(data) {
      const inviteLink = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/accept-invitation/${data.id}`
      console.log("Send invite for org: ", data, inviteLink)
    }
  }),
  openAPI(),
  nextCookies()
]

export type BetterAuthPlugins = typeof betterAuthPlugins

export const betterAuthOptions: BetterAuthOptions = {
  appName: "payload-better-auth",
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  trustedOrigins: [process.env.NEXT_PUBLIC_BETTER_AUTH_URL!],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
    async sendResetPassword({ user, url }) {
      console.log("Send reset password for user: ", user.id, "at url", url)
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      console.log("Send verification email for user: ", url)
    }
  },
  plugins: betterAuthPlugins,
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        console.log(
          "Send change email verification for user: ",
          user,
          newEmail,
          url,
          token
        )
      }
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        // Send delete account verification
      },
      beforeDelete: async (user) => {
        // Perform actions before user deletion
      },
      afterDelete: async (user) => {
        // Perform cleanup after user deletion
      }
    },
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"]
    }
  }
}

export const betterAuthPluginOptions: BetterAuthPluginOptions = {
  disabled: false,
  debug: {
    logTables: true,
    enableDebugLogs: true
  },
  disableDefaultPayloadAuth: true,
  hidePluginCollections: false,
  users: {
    slug: "users", // not required, this is the default anyways
    hidden: false,
    adminRoles: ["admin"],
    allowedFields: ["name"]
  },
  accounts: {
    slug: "accounts"
  },
  sessions: {
    slug: "sessions"
  },
  verifications: {
    slug: "verifications"
  },
  adminInvitations: {
    sendInviteEmail: async ({ payload, email, url }) => {
      console.log("Send admin invite: ", email, url)
      return {
        success: true
      }
    }
  },
  betterAuthOptions: betterAuthOptions
}
