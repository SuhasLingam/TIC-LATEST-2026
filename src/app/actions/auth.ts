"use server";

import { redirect } from "next/navigation";
import { createClient } from "~/utils/supabase/server";

export async function sendAuthOtp(email: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) return { error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function verifyAuthOtp(email: string, token: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
