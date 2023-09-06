/**
 * Copyright 2020 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const path = require('path')
const assert = require('assert')
const fs = require('fs')

'use strict'

const sorvinDir = `${__dirname}/../sovrin-originals`
const updatesTxsDir = `${__dirname}/../genesis`

const compareFiles = [
  'sovrin_mainnet.ndjson',
  'sovrin_testnet.ndjson'
]

function parseTxsFile (path) {
  let txs = []
  const allContents = fs.readFileSync(path, 'utf-8')
  allContents.split(/\r?\n/).forEach((line) => {
    if (line.length > 0) {
      txs.push(JSON.parse(line))
    }
  })
  return txs
}

function compareTxs (version1Txs, version2Txs) {
  const errors = []
  for (let i = 0; i < version1Txs.length; i++) {
    const version1Tx = version1Txs[i]
    const version2Tx = version2Txs[i]
    try {
      assert.deepStrictEqual(version1Tx, version2Tx)
    } catch (err) {
      errors.push({index: i, version1Tx, version2Tx})
    }
  }
  return errors
}

function run (version1Dir, version2Dir) {
  assert.notStrictEqual(version1Dir, version2Dir)

  for (const txsFile of compareFiles) {
    const version1Path = path.join(version1Dir, txsFile)
    const version2Path = path.join(version2Dir, txsFile)
    const version1Txs = parseTxsFile(version1Path)
    const version2Txs = parseTxsFile(version2Path)
    console.log(`Comparing TXS v1: ${version1Path}, v2: ${version2Path}`)
    const errors = compareTxs(version1Txs, version2Txs)
    if (errors.length > 0) {
      for (const error of errors) {
        const { index, version1Tx, version2Tx } = error
        console.error(`\nTX Mismatch on index ${index} between: \n${version1Path}\n${version2Path}\nTransactionV1:\n${JSON.stringify(version1Tx, null, 2)}\nTransactionV2:\n${JSON.stringify(version2Tx, null, 2)}`)
      }
    } else {
      const colorGreen = "\x1b[32m"
      const colorReset = "\x1b[0m"
      console.log(`${colorGreen}OK${colorReset}`)
    }
  }
}

try {
  run(sorvinDir, updatesTxsDir)
} catch (err) {
  console.error(`Unhandled error. Application will be terminated. ${err.stack}`)
  process.exit(255)
}

process.exit(0)


