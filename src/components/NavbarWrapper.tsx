import { createClient } from "~/utils/supabase/server";
import { ClientNavbar } from "./ClientNavbar";

export async function NavbarWrapper() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isLoggedIn = !!data?.user;

  return <ClientNavbar isLoggedIn={isLoggedIn} />;
}
