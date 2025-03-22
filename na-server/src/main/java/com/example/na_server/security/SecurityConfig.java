package com.example.na_server.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        // Authorization rules
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/h2-console/**").permitAll() // Allow access to H2 console
            .requestMatchers("/api/ingredients").authenticated() // Require authentication for /api/ingredients
            .anyRequest().permitAll() // Allow all other requests
        )
        // OAuth2 Resource Server with JWT setup
        //.oauth2ResourceServer(oauth2 -> oauth2.jwt() -old
            // OAuth2 Resource Server with JWT setup (Updated for Spring Security 6)
            .oauth2ResourceServer(oauth2 -> oauth2
            .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
        )
        // CSRF settings for H2 console (disable CSRF and allow iframe)
        .csrf(csrf -> csrf
            .ignoringRequestMatchers("/h2-console/**") // Disable CSRF for H2 console
        )
        .headers(headers -> headers
            .frameOptions(frameOptions -> frameOptions.sameOrigin())  // Allow iframe (needed for H2)
        );

        //Without H2 Authorization
        //http
        //    .authorizeHttpRequests(auth -> auth
        //        .requestMatchers("/api/ingredients").authenticated() // Require authentication
        //        .anyRequest().permitAll()
        //    )
        //    .oauth2ResourceServer(oauth2 -> oauth2
        //        .jwt(jwt -> {})); // Updated JWT configuration to avoid deprecated methods
        return http.build();
    }
    // Custom JWT Converter to extract roles from token claims
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_"); // Ensures roles are prefixed correctly
        grantedAuthoritiesConverter.setAuthoritiesClaimName("roles"); // Extracts roles from JWT claim "roles"

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

// CORS Configuration Bean
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // React App URL
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.setAllowCredentials(true); // Allow credentials (cookies, auth tokens)
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); // Apply CORS configuration globally

        return source;
    }
}