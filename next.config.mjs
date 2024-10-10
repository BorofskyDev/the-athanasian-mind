// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Enable WebAssembly support if needed
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    // Add a rule to handle .wasm files if needed
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    })

    // No need to alias or externalize `firebase-admin` since it's only used server-side
    return config
  },
}

export default nextConfig
