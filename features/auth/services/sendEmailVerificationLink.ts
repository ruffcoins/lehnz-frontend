import axios from "axios";

export async function sendEmailVerificationLink(email: string) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/send-email-verification-link`,
    {
      email,
    }
  );
  return response.data;
}
