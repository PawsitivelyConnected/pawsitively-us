import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import client from '@src/supabase/client'

const AuthPage = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <Auth
        supabaseClient={client}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        redirectTo="/maps"
      />
    </section>
  )
}

export default AuthPage
