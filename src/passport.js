import passport from "passport";
import JwtStrategy from "passport-jwt";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const JwtOptions = {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret:process.env.JWT_SECRET
};
// JWT는 토큰을 받아서 해석
// 해석한 내용을 콜백 함수(verifyUser)로 전달

const verifyUser = (payload, done) => {
    try{

    }catch{
        
    }
};

passport.use(new JwtStrategy(JwtOptions, verifyUser));