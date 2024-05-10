/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.ibb.co",
      "res.cloudinary.com",
      "encrypted-tbn2.gstatic.com",
      "cdn1.epicgames.com",
      "image.api.playstation.com",
      "m.media-amazon.com",
      "encrypted-tbn1.gstatic.com",
      "upload.wikimedia.org"
    ], // Add "res.cloudinary.com" to the domains array
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: ["i.ibb.co ",  "res.cloudinary.com"],
  //       port: "http://localhost:3000/",
  //       pathname: "http://localhost:3000/",
  //     },
  //   ],
  // },
};

export default nextConfig;
