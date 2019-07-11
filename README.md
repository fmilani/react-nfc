# react-nfc

> A declarative react api for the web imperative one

[![NPM](https://img.shields.io/npm/v/react-nfc.svg)](https://www.npmjs.com/package/react-nfc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-nfc

# or if you use yarn
yarn add react-nfc
```

## Usage

```jsx
import React from 'react'

import { useNfcRead } from 'react-nfc'

function Example() {
  const nfc = useNfcRead()
  return (
    <div>
      <div>Status: {nfc.status}</div>
      <div>Data: {JSON.stringify(nfc.data)}</div>
    </div>
  )
}
```

## License

MIT © [fmilani](https://github.com/fmilani)
