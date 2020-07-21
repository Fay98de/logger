# logger

A tiny but graceful logger make log on web inspectors grouped by namespace & color, easy to find and read.

## Installation

```
npm install clearly-logger
```

## Usage

```js
import Logger, { info, success, warn, error } from 'clearly-logger'

// use Logger
Logger.info('sth to log')
Logger.success('sth to log')
Logger.warn('sth to log')
Logger.error('sth to log')

// use function
info('sth to log')
success('sth to log')
warn('sth to log')
error('sth to log')

// use Logger instance
let logger = new Logger()
logger.info('sth to log')
logger.success('sth to log')
logger.warn('sth to log')
logger.error('sth to log')

// custom symbol
let logger = new Logger('￥')
logger.info('sth to log')
logger.success('sth to log')
logger.warn('sth to log')
logger.error('sth to log')

// custom symbol & namespace
let logger = new Logger('￥', 'namespace')
logger.info('sth to log')
logger.success('sth to log')
logger.warn('sth to log')
logger.error('sth to log')

// custom symbol & namespace with color
let logger = new Logger('￥(#00ff00)', 'namespace(#0000ff)')
logger.info('sth to log')
logger.success('sth to log')
logger.warn('sth to log')
logger.error('sth to log')
```

Logger is compatible with [string substitutions](https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions) implemented by `window.console`

```js
let logger = new Logger()
logger.info('sth to log %d', 123)
```
