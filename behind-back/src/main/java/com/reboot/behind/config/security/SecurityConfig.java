package com.reboot.behind.config.security;

import com.reboot.behind.config.security.oauth.OAuth2SuccessHandler;
import com.reboot.behind.config.security.oauth.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    private final PrincipalOauth2UserService principalOauth2UserService;

    @Autowired
    public SecurityConfig(JwtTokenProvider jwtTokenProvider, PrincipalOauth2UserService principalOauth2UserService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.principalOauth2UserService = principalOauth2UserService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic().disable() // UI 사용 기본 설정 비활성화
                .csrf().disable() // REST API는 csrf 보안이 필요 없다.
                .sessionManagement()
                .sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS) // JWT Token 인증방식에는 세션이 필요없다.

                .and()
                .authorizeRequests()
                .antMatchers("/signUp/**","/oauth2/**").permitAll()
                .antMatchers("**exception**").permitAll()
                 .anyRequest().hasAuthority("USER")
                .and()
                .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class)// JWT Token 필터를 id/password 인증 필터 이전에 추가
                .oauth2Login()
                .successHandler(new OAuth2SuccessHandler(jwtTokenProvider))
                .userInfoEndpoint()
                .userService(principalOauth2UserService);
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui.html", "/webjars/**", "/swagger/**");
    }
}
