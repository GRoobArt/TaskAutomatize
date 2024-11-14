export interface SessionDto {
  email: string
  token: string
  expiresAt: Date
}

export interface UpdateSessionDto extends Partial<SessionDto> {}

export interface SessionData {}
