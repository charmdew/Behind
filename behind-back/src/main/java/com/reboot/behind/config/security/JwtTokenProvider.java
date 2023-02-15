package com.reboot.behind.config.security;

import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor //초기화되지 않은 final 필드나 @NonNull이 선언된 필드의 생성자를 만들어주고, 의존성을 주입한다.
public class JwtTokenProvider {

    private final Logger LOGGER = LoggerFactory.getLogger(JwtTokenProvider.class);

    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;

    @Value("${springboot.jwt.secret}")
    /*
    application.properties에서 springboot.jwt.secret에 접근하여 값을 가져오고,
    값을 가져오지 못하면 기본 지정 값을 가진다.
    */
    private String secretKey = "secretKey";

    //토큰 유효기간. 일주일 유효
    private final long tokenValidMillisecond = 1000L*60*30;

    @PostConstruct
    protected void init(){
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 시작");
        System.out.println(secretKey);
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
        System.out.println(secretKey);
        LOGGER.info("[init] JwtTokenProvider 내 secretKey 초기화 시작");
    }

    public String createToken(int id, String role, boolean isRefresh){
        LOGGER.info("[createToken] 토큰 생성 시작");
        Claims claims = Jwts.claims().setSubject(id+"");
        claims.put("role", role);
        String token;
        Date now = new Date();
        if(isRefresh){
            token = Jwts.builder()
                    .setClaims(claims)
                    .setIssuedAt(now)
                    .setExpiration(new Date(now.getTime() + tokenValidMillisecond*2*24*14))
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
        }else{
             token = Jwts.builder()
                    .setClaims(claims)
                    .setIssuedAt(now)
                    .setExpiration(new Date(now.getTime() + tokenValidMillisecond))
                    .signWith(SignatureAlgorithm.HS256, secretKey)
                    .compact();
        }

        LOGGER.info("[createToken] 토큰 생성 완료");
        return token;
    }

    //JWT 토큰으로 인증 정보를 조회한다.
    public Authentication getAuthentication(String token){
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 시작");
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getId(token));
        LOGGER.info("[getAuthentication] 토큰 인증 정보 조회 완료, UserDetails UserName : {}",
                userDetails.getUsername());
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    //JWT 토큰에서 회원 구별 정보를 추출한다.
    public String getId(String token){
        LOGGER.info("[getId] 토큰 기반 회원 구별 정보 추출");
        String info = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().getSubject();
        LOGGER.info("[getId] 토큰 기반 회원 구별 정보 추출 완료, info : {}", info);
        return info;
    }

    public String getRole(String token){
        String role = (String)Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().get("role");
        return role;
    }

    public String resolveToken(HttpServletRequest request){
        LOGGER.info("[resolveToken] HTTP 헤더에서 Token 값 추출");
        return request.getHeader("X-AUTH-TOKEN"); // 리퀘스트의 헤더로 전달된 값을 추출한다. 헤더의 이름은 변경 가능하다.
    }

    public int validateToken(String token){
        LOGGER.info("[validateToken] 토큰 유효 체크 시작");
        try{
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            LOGGER.info("[validateToken] 토큰 유효 체크 완료");
            if(!claims.getBody().getExpiration().before(new Date())){
                return 1;
            }else{
                return 2;
            }
        }catch (Exception e){
            LOGGER.info("[validateToken] 토큰 유효 체크 예외 발생");
            return 0;
        }
    }

    public boolean validateRefreshToken(String refreshToken){
        if(validateToken(refreshToken) != 1) return false;
        String id = getId(refreshToken);
        User user = userRepository.findById(Integer.parseInt(id)).get();
        if(user.getRefreshToken().equals(refreshToken)){
            return true;
        }
        return false;
    }
}
