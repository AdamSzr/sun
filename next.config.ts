import type { NextConfig } from "next"

const nextConfig:NextConfig = {
  output: `standalone`,
  /* config options here */
  experimental: {
    middlewareClientMaxBodySize: `10gb`,
  },
}

export default nextConfig
