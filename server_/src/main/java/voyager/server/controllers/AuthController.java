package voyager.server.controllers;

import jakarta.validation.Valid;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import voyager.server.models.LoginRequest;
import voyager.server.security.JwtConverter;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JdbcUserDetailsManager jdbcUserDetailsManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtConverter jwtConverter;

    public AuthController(AuthenticationManager authenticationManager,
                          JdbcUserDetailsManager jdbcUserDetailsManager,
                          PasswordEncoder passwordEncoder,
                          JwtConverter jwtConverter) {

        this.authenticationManager = authenticationManager;
        this.jdbcUserDetailsManager = jdbcUserDetailsManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtConverter = jwtConverter;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginRequest loginRequest,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(bindingResult.getAllErrors()
                            .stream()
                            .map(MessageSourceResolvable::getDefaultMessage));
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword());

        try {
            Authentication auth = authenticationManager.authenticate(
                    authenticationToken);
            return ResponseEntity.ok(Map.of(
                    "token", jwtConverter.getTokenFromUser(
                            (UserDetails) auth.getPrincipal())));
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest()
                    .body(List.of("Invalid Username or Password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody @Valid LoginRequest loginRequest,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(bindingResult.getAllErrors()
                            .stream()
                            .map(MessageSourceResolvable::getDefaultMessage));
        }

        UserDetails userDetails = User.builder()
                .username(loginRequest.getUsername())
                .passwordEncoder(passwordEncoder::encode)
                .password(loginRequest.getPassword())
                .roles("USER")
                .build();

        try {
            jdbcUserDetailsManager.createUser(userDetails);
        } catch (DuplicateKeyException e) {
            return ResponseEntity.badRequest()
                    .body(List.of("Username already exists"));
        }

        return ResponseEntity.ok(List.of("User registered successfully"));
    }
}

