import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
           { 

            hostname: "localhost",
            protocol: "http"

           }
        ]
    }
};

export default nextConfig;
