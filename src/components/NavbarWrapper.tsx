import { createClient } from "~/utils/supabase/server";
import { Navbar } from "./Navbar";

export async function NavbarWrapper() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const isLoggedIn = !!data?.user;

  return <Navbar isLoggedIn={isLoggedIn} />;
}
