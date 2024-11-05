"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>> = 
  React.forwardRef(({ className, ...props }, ref: React.Ref<HTMLDivElement>) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>> = 
  React.forwardRef(({ className, ...props }, ref: React.Ref<HTMLButtonElement>) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-gray-700 hover:text-gray-900 data-[state=active]:bg-black data-[state=active]:text-white",
        className
      )}
      {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent: React.FC<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>> = 
  React.forwardRef(({ className, ...props }, ref: React.Ref<HTMLDivElement>) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }