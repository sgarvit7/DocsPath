// utils/emailMagicLink.ts
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { auth } from '../../firebase/config'

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-email`,
  // This must be true.
  handleCodeInApp: true,
}

export const sendMagicLink = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('emailForSignIn', email)
    }
    return { success: true }
  } catch (error: any) {
    console.error('Error sending magic link:', error)
    return { 
      success: false, 
      error: error.message || 'Failed to send verification email' 
    }
  }
}

export const verifyMagicLink = async (url: string, email?: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSignInWithEmailLink(auth, url)) {
      return { success: false, error: 'Invalid verification link' }
    }

    let emailToVerify = email
    if (!emailToVerify && typeof window !== 'undefined') {
      // Convert null to undefined using nullish coalescing operator
      emailToVerify = window.localStorage.getItem('emailForSignIn') ?? undefined
    }

    if (!emailToVerify) {
      return { success: false, error: 'Email not found. Please try signing up again.' }
    }

    await signInWithEmailLink(auth, emailToVerify, url)
    
    // Clear the email from storage
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('emailForSignIn')
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error verifying magic link:', error)
    return { 
      success: false, 
      error: error.message || 'Failed to verify email' 
    }
  }
}