const enum LEVEL {
  INFO = 'Info',
  SUCCESS = 'Success',
  WARN = 'Warn',
  ERROR = 'Error',
}

const STYLE = {
  SYMBOL: `
    margin: 0 0 0 0;
    padding: 1px 2px;
    color: #fff;
    background-color: #13c2c2;
  `,
  NAMESPACE: `
    margin: 0 0 0 0;
    padding: 1px 3px 0;
    font-size: 10px;
    border-top: 1px solid #13c2c2;
    border-right: 1px solid #13c2c2;
    border-bottom: 1px solid #13c2c2;
  `,
  [LEVEL.INFO]: `
    margin: 0 0 0 0;
    padding: 2px 2px 1px;
    font-size: 10px;
    color: #fff;
    background-color: #1890ff;
  `,
  [LEVEL.SUCCESS]: `
    margin: 0 0 0 0;
    padding: 2px 2px 1px;
    font-size: 10px;
    color: #fff;
    background-color: #52c41a;
  `,
  [LEVEL.WARN]: `
    margin: 0 0 0 0;
    padding: 2px 2px 1px;
    font-size: 10px;
    color: #fff;
    background-color: #faad14;
  `,
  [LEVEL.ERROR]: `
    margin: 0 0 0 0;
    padding: 2px 2px 1px;
    font-size: 10px;
    color: #fff;
    background-color: #ff4d4f;
  `,
}
const SUBSTITUTION_REG = /%(\.\d+)?[idfsoO]/
const COLOR_REG = /\(([^()]+)\)$/

let randomColor = () => {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

let randomDarkColor = (): string => {
  let h = Math.floor(Math.random() * 360)
  let s = Math.floor(Math.random() * 50) + 50 // ensure saturation is gt 50%
  let l = Math.floor(Math.random() * 60) // ensure lightness is lt 60%
  return `hsl(${h}, ${s}%, ${l}%)`
}

let makeStaticArgs = (type: LEVEL, data = []) => {
  let formatter = ''
  let styles = []
  if (Logger.symbol) {
    formatter += `%c${Logger.symbol}`
    styles.push(`${STYLE.SYMBOL} background-color: ${Logger.symbolColor};`)
  }
  formatter += `%c${type}%c`
  styles.push(STYLE[type], '')
  while (SUBSTITUTION_REG.test(data[0])) {
    formatter += ' ' + data.shift()
  }
  return [formatter, ...styles, ...data]
}

let makeInstanceArgs = (instance: Logger, type: LEVEL, data = []) => {
  let formatter = instance.formatter
  let styles = instance.styles.slice()
  formatter += `%c${type}%c`
  styles.push(STYLE[type], '')
  while (SUBSTITUTION_REG.test(data[0])) {
    formatter += ' ' + data.shift()
  }
  return [formatter, ...styles, ...data]
}

export function info(...data: []) {
  console.log.apply(console, makeStaticArgs(LEVEL.INFO, data))
}

export function success(...data: []) {
  console.log.apply(console, makeStaticArgs(LEVEL.SUCCESS, data))
}

export function warn(...data: []) {
  console.log.apply(console, makeStaticArgs(LEVEL.WARN, data))
}

export function error(...data: []) {
  console.log.apply(console, makeStaticArgs(LEVEL.ERROR, data))
}

export default class Logger {
  static symbol = ''
  static separator = ''
  static symbolColor = '#13c2c2'

  static info = info
  static success = success
  static warn = warn
  static error = error

  symbol = ''
  namespace = ''
  symbolColor = '#13c2c2'
  namespaceColor = randomDarkColor()
  formatter = ''
  styles: string[] = []

  constructor(symbol = '', namespace = '') {
    let symbolColorMatch = symbol.match(COLOR_REG) || []
    let namespaceColorMatch = namespace.match(COLOR_REG) || []
    this.symbol = symbol.replace(COLOR_REG, '')
    this.symbolColor = symbolColorMatch[1] || this.symbolColor
    this.namespace = namespace.replace(COLOR_REG, '')
    this.namespaceColor = namespaceColorMatch[1] || this.namespaceColor

    if (this.symbol) {
      this.formatter += `%c${this.symbol}`
      this.styles.push(`${STYLE.SYMBOL} background-color: ${this.symbolColor};`)
    }

    if (this.namespace) {
      this.formatter += `%c${this.namespace}`
      this.styles.push(
        `${STYLE.NAMESPACE} color: ${this.namespaceColor}; border-color: ${this.symbolColor};`
      )
    }
  }

  info = (...data: []) => {
    console.log.apply(console, makeInstanceArgs(this, LEVEL.INFO, data))
  }

  success = (...data: []) => {
    console.log.apply(console, makeInstanceArgs(this, LEVEL.SUCCESS, data))
  }

  warn = (...data: []) => {
    console.log.apply(console, makeInstanceArgs(this, LEVEL.WARN, data))
  }

  error = (...data: []) => {
    console.log.apply(console, makeInstanceArgs(this, LEVEL.ERROR, data))
  }
}
