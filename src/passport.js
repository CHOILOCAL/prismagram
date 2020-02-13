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

  // passport는 session과 cookies를 가져오고 만들어주고 모든 일을 함
  export const authenticateJwt = (req, res, next) => 
    passport.authenticate("jwt", { session: false }, (error, user) => {
     if(user){
        req.user = user;
      }
      next();
    })(req, res, next);
  // 리턴한것을 req, res, next로 넘겨주어야함
  // 로그인이 되어있다면 graqhql에 사용자 정보 추가 -> 요청

passport.use(new Strategy(JwtOptions, verifyUser));
passport.initialize();