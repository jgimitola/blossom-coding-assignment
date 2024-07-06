export type Palette = {
  white: string;
  black: string;
  blue: string;
  darkRed: string;
  red: string;
  lightRed: string;
  darkGray: string;
  lightGray: string;
  background: string;
};

export type MediaQuery = {
  md: string;
};

/**
 * Utility types
 *
 * @see https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
 */
export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

/**
 * Utility types
 *
 * @see https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
 */
export type Paths<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${'' | `.${Paths<T[K]>}`}`;
    }[keyof T]
  : never;
