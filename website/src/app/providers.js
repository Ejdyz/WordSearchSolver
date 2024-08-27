"use client"
import React from 'react';
import {NextUIProvider} from "@nextui-org/react";
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import 'primereact/resources/themes/saga-blue/theme.css';
const Providers = ({children}) => {
  return (
    <NextUIProvider>
      <PrimeReactProvider  value={{ unstyled: false, pt: Tailwind }}>
        {children}
      </PrimeReactProvider>
    </NextUIProvider>
  );
};

export default Providers;