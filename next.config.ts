import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: '/type-caster',
  trailingSlash: true, // Optional: makes URLs like /type-caster/page/
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
// module.exports = {
//   turbopack: {
//     rules: {
//       '*.svg': {
//         loaders: ['@svgr/webpack'],
//         as: '*.js',
//       },
//     },
//   },
// }