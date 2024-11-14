'use server'

import * as jwt from 'jose'

import { JWT } from './types'

const alg = 'HS256'

const encode = (key: string) => {
  return new TextEncoder().encode(key)
}

export async function getJwt(key: string, payload: JWT, expire: string) {
  try {
    return new jwt.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime(expire)
      .sign(encode(key))
  } catch (e) {
    return null
  }
}

export async function verifyJwt(key: string, token: string) {
  try {
    await jwt.jwtVerify(token, encode(key))
    return true
  } catch (e) {
    return false
  }
}

export async function decodeJwt(key: string, token: string) {
  try {
    const { payload } = await jwt.jwtVerify(token, encode(key))
    return payload as JWT
  } catch (e) {
    return null
  }
}
