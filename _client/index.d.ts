declare interface Window {
  CSRFToken: string;
}

declare module '*.less' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export default classNames;
}