'use server'

import { cookies } from 'next/headers'

export const getCookie = async (name: string) => {
  const cookieStore = cookies()

  try {
    const cookies = cookieStore.get(name)

    if (!cookies) return null

    return cookies.value
  } catch (e) {
    return null
  }
}

export const setCookie = async (
  name: string,
  value: string,
  expires: number
) => {
  try {
    const timeExpires = new Date(Date.now() + expires)

    cookies().set({
      name: name,
      value: value,
      httpOnly: true,
      path: '/',
      expires: timeExpires,
    })

    return true
  } catch (e) {
    return false
  }
}

export const getAllCookies = async () => {
  const cookieStore = cookies()

  try {
    return cookieStore.getAll()
  } catch (e) {
    return null
  }
}

export const hasCookie = async (name: string) => {
  const cookieStore = cookies()

  try {
    const cookie = cookieStore.has(name)
    if (!cookie) return false

    return true
  } catch (e) {
    return false
  }
}

export const removeCookie = async (name: string) => {
  try {
    cookies().delete(name)
    return true
  } catch (e) {
    return false
  }
}

export const removeAllCookies = async () => {
  const cookieStore = cookies()

  try {
    const allCookies = cookieStore.getAll()

    for (const cookie of allCookies) {
      cookies().delete(cookie.name)
    }
  } catch (e) {
    return false
  }
}
