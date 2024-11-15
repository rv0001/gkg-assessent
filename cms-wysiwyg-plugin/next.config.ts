import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for better error handling and warnings

  // Enable support for ES Modules
  experimental: {
    esmExternals: true, // To allow ES module support in external dependencies
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/post",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
