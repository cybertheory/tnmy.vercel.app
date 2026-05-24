/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/essays",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
