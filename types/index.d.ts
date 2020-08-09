export as namespace Logger
export declare function info(...data: any[]): void
export declare function success(...data: any[]): void
export declare function warn(...data: any[]): void
export declare function error(...data: any[]): void
export default class Logger {
  static symbol: string
  static separator: string
  static symbolColor: string
  static info: typeof info
  static success: typeof success
  static warn: typeof warn
  static error: typeof error
  symbol: string
  namespace: string
  symbolColor: string
  namespaceColor: string
  formatter: string
  styles: stringany[]
  constructor(symbol?: string, namespace?: string)
  info(...data: any[]): void
  success(...data: any[]): void
  warn(...data: any[]): void
  error(...data: any[]): void
}
