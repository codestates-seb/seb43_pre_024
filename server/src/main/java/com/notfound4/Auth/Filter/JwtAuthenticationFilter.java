package com.notfound4.Auth.Filter;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.notfound4.Member.Entity.Member;
import com.notfound4.Auth.Dto.LoginDto;
import com.notfound4.Auth.Jwt.JwtTokenizer;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

//    private final RedisTemplate<String, String> redisTemplate;
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    // 인증 로직
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);


        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    // 인증 성공할 경우 로직
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        // redis에 refresh 토큰 저장
//        ValueOperations<String, String> test = redisTemplate.opsForValue();
//        test.set("RT:" + member.getEmail(), refreshToken, jwtTokenizer.getRefreshTokenExpirationMinutes(), TimeUnit.MILLISECONDS);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("member-id", member.getMemberId().toString());

        // json 데이터 생성후 바디 응답 : memberId
        Map<String, Object> jsonData = new HashMap<>();
        jsonData.put("memberId", member.getMemberId());

        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(jsonData);

        response.setContentType("application/json");

        PrintWriter writer = response.getWriter();
        writer.write(jsonString);
    }

    // Access Token 생성 로직
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", List.of("ROLE_USER"));

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // Refresh Token 생성 로직
    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
