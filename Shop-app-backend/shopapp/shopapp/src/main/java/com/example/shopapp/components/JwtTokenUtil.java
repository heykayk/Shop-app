package com.example.shopapp.components;

import com.example.shopapp.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.InvalidParameterException;
import java.security.Key;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class JwtTokenUtil {
    @Value("${jwt.expiration}")
    private Long expiration; //  lưu vào biến môi trường

    @Value("${jwt.secretKey}")
    private String secretKey;

    public String generateToken(com.example.shopapp.models.User user) throws Exception{
        // thuộc tính => claims
        Map<String, Object> claims = new HashMap<>();
//        this.generateSecretKey();
        claims.put("phoneNumber", user.getPhoneNumber());
        try{
            String token = Jwts
                    .builder()
                    .setClaims(claims)
                    .setSubject(user.getPhoneNumber())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L))
                    .signWith(getSignKey(), SignatureAlgorithm.HS256)
                    .compact();
            return token;
        }catch(Exception e){
            // you can "inject" logger, intead of println
            throw new InvalidParameterException("Cannot create jwt token, error: " + e.getMessage());
        }
    }

    private String generateSecretKey(){
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[32];
        random.nextBytes(keyBytes);
        String secretKey = Encoders.BASE64.encode(keyBytes);

        return secretKey;
    }

    private Key getSignKey(){
        byte[] bytes = Decoders.BASE64.decode(secretKey);
        // Keys.hmacShaKeyFor(Decoders.BASE64.decode("2Y/9RxxpJsjXceU9OTV7knWfzZ1ugO+qp80mVpAv/kg="))
        return Keys.hmacShaKeyFor(bytes);
    }

    private Claims exstractAllClaims(String token){
        return Jwts.parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJwt(token)
                .getBody();
    }

    public  <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = this.exstractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // check token còn hạn không
    public boolean isTokenExpired(String token){
        Date expirationDate = this.extractClaim(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }
}
