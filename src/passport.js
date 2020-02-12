import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
// JWT는 토큰을 받아서 해석
// 해석한 내용을 콜백 함수(verifyUser)로 전달
const verifyUser = async (payload, done) => {
    try {
      const user = await prisma.user({ id: payload.id });
      if (user !== null) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  };

passport.use(new Strategy(JwtOptions, verifyUser));