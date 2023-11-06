/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


// SET SERVER IP HERE
// CURRENTLY SET TO localhost for TESTING
// IF RUNNING both backend and frontend locally then use CORS middleware in server. ( for dev purpose only )
const SERVER_IP = "http://172.23.18.255:8080"

module.exports = {
  env: {
    SERVER_IP: SERVER_IP,
  },
};