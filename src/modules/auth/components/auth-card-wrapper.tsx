"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { cn } from "@/utilities/cn"

interface AuthCardWrapperProps extends React.ComponentProps<"div"> {
  children: React.ReactNode
  title: string
  subtitle?: string
  className?: string
}

const AuthCardWrapper = ({
  children,
  title,
  subtitle,
  className,
  ...props
}: AuthCardWrapperProps) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="p-0 justify-center items-center flex">
          {children}
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default AuthCardWrapper
