<script setup>
    import { useForm, useField } from 'vee-validate'
    import { loginSchema as validationSchema } from '../validation/loginSchema'
    import { useAuthStore } from '../stores/auth'

    const { handleSubmit } = useForm({ validationSchema })
    const auth = useAuthStore()

    const email = useField('email')
    const password = useField('password')

    const submit = handleSubmit((values) => {
        auth.login(values)
    })

</script>

<template>
    <v-card
        flat
        max-width="600"
        class="mx-auto my-10"
    >
        <v-card-title
            class="text-h4 font-weight-black text-black"
            tag="h3"
        >
            Bienvenido de nuevo!
        </v-card-title>

        <v-card-subtitle
            class="text-h5"
        >
            Inicia Sesión con tu cuenta
        </v-card-subtitle>

        <v-alert
            v-if="auth.hasError"
            class="my-5"
            type="error"
            >
            {{ auth.errorMsg }}
        </v-alert>

        <v-form class="mt-5">
            <v-text-field 
                type="email"
                label="Email"
                bg-color="blue-grey-lighten-5"
                class="mb-3"    
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />

            <v-text-field 
                type="password"
                label="Password"
                bg-color="blue-grey-lighten-5"
                class="mb-3"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                
            />

            <v-btn
                block
                color="blue-lighten-3"
                @click = "submit"
            >
                Iniciar Sesión
            </v-btn>
        </v-form>
    </v-card>
</template>
