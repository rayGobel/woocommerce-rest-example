const http = require('http')
const crypto = require('crypto')
const secretFile = require('./secret.json')

const endpoint = 'http://localhost:8080/wp-json/wc/v2/products/'
const consumerKey = secretFile.consumer_key
const consumerSecret = secretFile.consumer_secret + '&' // This ampersand is important
const date = Date.now() / 1000 | 0

const oauthParams = [
  [ 'oauth_consumer_key', consumerKey ],
  [ 'oauth_nonce', crypto.randomBytes(12).toString('hex') ],
  [ 'oauth_signature_method', 'HMAC-SHA1' ],
  [ 'oauth_timestamp', date ]
]

const secret = generateSecretParams(oauthParams)
const signatureBaseString = generateSignatureBaseString('GET', endpoint, secret)
const signature = generateSignature(consumerSecret, signatureBaseString)
const requestParams = secret + `&oauth_signature=${signature}`

http.get(endpoint + '?' + requestParams, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    let responseData = JSON.parse(data)
    console.log(responseData)
  })
}).on('error', (err) => {
  console.log('error: ', err)
})

function generateSignatureBaseString () {
  const args = Array.from(arguments)
  const decoded = args.map(arg => encodeURIComponent(arg))
  return decoded.join('&')
}

function generateSignature (consumerSecret, signatureBaseString) {
  const HASH = 'sha1'
  const DIGEST = 'base64'
  return crypto.createHmac(HASH, consumerSecret)
    .update(signatureBaseString)
    .digest(DIGEST)
}

function generateSecretParams (secretArray) {
  const result = secretArray.map((item) => item.join('='))
  return result.join('&')
}
