import * as jwt from 'jose'

export interface JWT extends jwt.JWTPayload {
  email: string
  work: string
  role: string
}
