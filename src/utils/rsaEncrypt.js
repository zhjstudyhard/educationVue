import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCAUvn53RPCMvI7ajQsxdV5dzwZyMAQvtUV4+3obufV8UWjrOvRdM3gTgOL0OS5Z8ZF2X4wils0HMvbapeKKwGi8venojNGqnXdlCrm9PANCz0BWXxFRkwhZB4MEpigp8wwMfy4G5cfVY24BLjVVrjLgQHb5Vwt9o1hoqCi+GAVqwIDAQAB'
// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

