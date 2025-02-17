import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const key = process.env.ACCESS_SECRET
const encodedAccessKey = new TextEncoder().encode(key)

const AccessExpiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)

interface SessionPayload extends JWTPayload {
    user_id: number,
    username: string,
    role: string,
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(AccessExpiresAt)
        .sign(encodedAccessKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedAccessKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(payload: SessionPayload) {
    const session = await encrypt({ id: crypto.randomUUID(), user_id: payload.user_id, username: payload.username, role: payload.role })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
      httpOnly: true,
    //   secure: true,
      expires: AccessExpiresAt,
      sameSite: 'lax',
      path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}