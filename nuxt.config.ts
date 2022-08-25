import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    serverMiddleware: [
        '~/server/app.ts'
    ],
    app: {
        head: {
            script: [
                { src: 'https://cdn.jsdelivr.net/npm/flatpickr' },
                { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js', body: true },
                { src: 'https://cdn.jsdelivr.net/npm/flatpickr', body: true }
            ],
            link: [
                { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css' },
                { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css' },
                { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css' }
            ],
            css: [
                {src: '~/assets/css/app.scss',  lang: 'scss'}
            ]
            
        }
    }
})
