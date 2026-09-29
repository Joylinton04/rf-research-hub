import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.8.179:3000","10.132.93.221"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withPayload(nextConfig);
