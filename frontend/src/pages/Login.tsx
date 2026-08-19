import { loginRequest } from '@/api/auth.api'
import { useAuth } from '@/context/auth'
import { createForm, type SubmitHandler } from '@modular-forms/solid'
import { createSignal, createEffect, Show } from 'solid-js'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { useNavigate } from '@solidjs/router'

type LoginFormValues = {
  username: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const { user, refreshUser } = useAuth()
  const [loading, setLoading] = createSignal(false)
  const [checkingAuth, setCheckingAuth] = createSignal(true)

  createEffect(() => {
    if (user()) {
      navigate('/', { replace: true })
    } else {
      setCheckingAuth(false)
    }
  })

  const [_, { Form, Field }] = createForm<LoginFormValues>({
    validateOn: 'blur'
  })

  const handleLogin: SubmitHandler<LoginFormValues> = async values => {
    try {
      setLoading(true)
      await loginRequest(values.username, values.password)
      await refreshUser()
      navigate('/')
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div class='min-h-screen bg-base-200 flex items-center justify-center p-4'>
      <Show
        when={!checkingAuth() && !user()}
        fallback={
          <div class='flex justify-center items-center'>
            <span class='loading loading-spinner loading-lg text-primary'></span>
          </div>
        }
      >
        <Form
          onSubmit={handleLogin}
          class='card bg-base-100 w-full max-w-sm shadow-xl border border-base-300'
        >
          <div class='card-body p-6'>
            <h2 class='card-title text-2xl font-black justify-center mb-4 text-primary'>
              API Test Panel
            </h2>
            <Field name='username'>
              {(field, props) => (
                <Input
                  label='Nombre de usuario'
                  disabled={loading()}
                  value={field.value}
                  error={field.error}
                  loading={loading()}
                  {...props}
                />
              )}
            </Field>
            <Field name='password'>
              {(field, props) => (
                <PasswordInput
                  label='Contraseña'
                  disabled={loading()}
                  value={field.value}
                  error={field.error}
                  loading={loading()}
                  {...props}
                />
              )}
            </Field>
            <div class='card-actions mt-6'>
              <button
                type='submit'
                class='btn btn-primary w-full text-white'
                disabled={loading()}
              >
                {loading() ? 'Iniciando sesión...' : 'Ingresar'}
              </button>
            </div>
          </div>
        </Form>
      </Show>
    </div>
  )
}
