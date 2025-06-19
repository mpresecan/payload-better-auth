import type { Metadata, Viewport } from 'next'
import { cn } from '@/utilities/cn'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'
import { Inter } from "next/font/google";
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/providers/theme-provider';
import { BetterAuthProvider } from '@/modules/auth/lib/context'
import { getContextProps } from '@/modules/auth/lib/context/get-context-props'
import { isImpersonationEnabled } from '@/modules/auth/utils/is-enabled';
import { ImpersonatingBar } from '@/modules/auth/components/admin-plugin/impersonating-bar';

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased w-full mx-auto scroll-smooth',
          inter.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BetterAuthProvider {...getContextProps()}>
            {isImpersonationEnabled && <ImpersonatingBar />}
            {children}
          </BetterAuthProvider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
