/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    ADMIN_EMAIL: 'admin@gmail.com',
    PASSWORD : 'admin@boss123'
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
},
}
