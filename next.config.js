/** @type {import('next').NextConfig} */
const nextConfig = { 
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone'
}

module.exports = nextConfig


// SET SERVER IP HERE
// CURRENTLY SET TO localhost for TESTING
// IF RUNNING both backend and frontend locally then use CORS middleware in server. ( for dev purpose only )
const SERVER_IP = process.env.SERVER_IP

module.exports = {
  env: {
    SERVER_IP: SERVER_IP,
  },
};

