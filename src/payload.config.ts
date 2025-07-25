// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import sharp from "sharp"
import { betterAuthPluginOptions } from "./modules/auth/lib/options"

import { Users } from "./modules/auth/collections/Users"
import { betterAuthPlugin } from "payload-auth/better-auth"
import { LegalDocuments } from "./modules/legal/collections/legal-documents"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    }
  },
  collections: [Users, LegalDocuments],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || ""
  }),
  sharp,
  plugins: [betterAuthPlugin(betterAuthPluginOptions)]
})
