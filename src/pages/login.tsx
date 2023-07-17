import client from "@src/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthPage = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <Auth supabaseClient={client} appearance={{ theme: ThemeSupa }} providers={["google"]} redirectTo="/my-profile"/>
    </section>
  );
};

export default AuthPage;
