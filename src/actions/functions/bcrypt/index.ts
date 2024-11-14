import bcryptjs from 'bcryptjs'

export async function hashPass(unHasshedPass: string): Promise<string> {
  return bcryptjs.hashSync(unHasshedPass, 10)
}

export async function comparePass(unHasshedPass: string, hashedPass: string) {
  return bcryptjs.compare(unHasshedPass, hashedPass)
}
