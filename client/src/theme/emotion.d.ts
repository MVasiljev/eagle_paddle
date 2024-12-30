// src/theme/emotion.d.ts
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primaryBlue: string;
      secondaryBlue: string;
      darkBlue: string;
      white: string;
      darkGray: string;
      lightGray: string;
      danger: string; // Add the danger color
    };
    typography: {
      fontFamily: string;
      sizes: {
        hero: string;
        title: string;
        subtitle: string;
        body: string;
        footer: string;
      };
      weights: {
        bold: number;
        regular: number;
      };
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    shadows: {
      card: string;
    };
    radius: {
      default: string;
    };
  }
}
