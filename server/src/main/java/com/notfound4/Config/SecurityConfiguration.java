package com.notfound4.Config;

import com.notfound4.Auth.Filter.JwtAuthenticationFilter;
import com.notfound4.Auth.Filter.JwtVerificationFilter;
import com.notfound4.Auth.Handler.OAuth2MemberSuccessHandler;
import com.notfound4.Auth.Jwt.JwtTokenizer;
import com.notfound4.Member.Service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.Arrays;
import java.util.List;



@Configuration
public class SecurityConfiguration {

    @Value("${spring.security.oauth2.client.registration.google.clientId}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.github.client-id}")
    private String githubClientId;

    @Value("${spring.security.oauth2.client.registration.github.client-secret}")
    private String githubClientSecret;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/users/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
//                        .antMatchers(HttpMethod.PATCH, "/users/**").authenticated()
//                        .antMatchers(HttpMethod.GET, "/users/**").authenticated()
//                        .antMatchers(HttpMethod.DELETE, "/users/**").authenticated()
//                        .antMatchers(HttpMethod.POST, "/questions/ask").authenticated()
//                        .antMatchers(HttpMethod.PATCH, "/questions/**").authenticated()
//                        .antMatchers(HttpMethod.DELETE, "/questions/**").authenticated()
//                        .antMatchers(HttpMethod.POST, "/questions/**/answer").authenticated()
//                        .antMatchers(HttpMethod.POST, "/questions/**/like").authenticated()
//                        .antMatchers(HttpMethod.PATCH, "/questions/**/answer/**").authenticated()
//                        .antMatchers(HttpMethod.DELETE, "/questions/**/answer/**").authenticated()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, memberService)));
        return http.build();
    }



    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:3001", "http://localhost:3002"
                , "http://localhost:3003", "http://localhost:3004"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"));
        configuration.addExposedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        List<ClientRegistration> registrations = List.of(
                googleClientRegistration(),
                githubClientRegistration()
        );
        return new InMemoryClientRegistrationRepository(registrations);
    }

    // oauth 구글 키, 시크릿 등록
    private ClientRegistration googleClientRegistration() {
        return CommonOAuth2Provider
                .GOOGLE
                .getBuilder("google")
                .clientId(googleClientId)
                .clientSecret(googleClientSecret)
                .build();
    }

    // oauth 깃허브 키, 시크릿 등록
    private ClientRegistration githubClientRegistration() {
        return CommonOAuth2Provider
                .GITHUB
                .getBuilder("github")
                .clientId(githubClientId)
                .clientSecret(githubClientSecret)
                .build();
    }


}
