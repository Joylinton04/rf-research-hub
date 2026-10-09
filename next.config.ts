import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.8.179:3000","10.132.93.221"],
  images: {
    // `domains` is deprecated since Next 14 — it cannot restrict protocol, port
    // or pathname, so a shared host would be allowed to serve anything through
    // the optimizer. These are the external hosts the pages still point at;
    // uploads come from the media bucket through Payload's own same-origin
    // route, which needs no entry here.
    remotePatterns: [
      new URL("https://cellbusters.com/wp-content/uploads/**"),
    ],
  },
};

export default withPayload(nextConfig);
