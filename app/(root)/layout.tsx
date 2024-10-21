"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import OneSignal from "react-onesignal";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      OneSignal.init({
        appId: "54970037-2517-4e16-8242-96e59487962d",
        // You can add other initialization options here
        notifyButton: {
          enable: true,
        },
        // Uncomment the below line to run on localhost. See: https://documentation.onesignal.com/docs/local-testing
        // allowLocalhostAsSecureOrigin: true
      });
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-primary-dark`}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
      {/* <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
      <script>
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        OneSignalDeferred.push(async function(OneSignal) {
          await OneSignal.init({
            appId: "54970037-2517-4e16-8242-96e59487962d",
          });
        });
      </script> */}
    </html>
  );
}
