import faunadb from 'faunadb'
import cookie from 'cookie'

export const FAUNA_SECRET_COOKIE = 'faunaSecret'

const secret: string = process.env.FAUNA_SERVER_KEY || ''
export const serverClient = new faunadb.Client({
  secret,
})

export const faunaClient = (secret: string) =>
  new faunadb.Client({
    secret,
  })

export const serializeFaunaCookie = (userSecret: string) => {
  const cookieSerialized = cookie.serialize(FAUNA_SECRET_COOKIE, userSecret, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 72576000,
    httpOnly: true,
    path: '/',
  })
  return cookieSerialized
}
