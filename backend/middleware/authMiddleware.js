import { expressjwt } from "express-jwt";
import jwks from "jwks-rsa";

const domain = process.env.AUTH0_DOMAIN;

export const checkJwt = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});
