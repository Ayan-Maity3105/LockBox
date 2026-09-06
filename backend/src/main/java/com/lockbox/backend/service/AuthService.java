package com.lockbox.backend.service;

import com.lockbox.backend.dto.RegisterRequest;
import com.lockbox.backend.dto.RegisterResponse;
import com.lockbox.backend.entity.User;
import com.lockbox.backend.exception.DuplicateResourceException;
import com.lockbox.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponse register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User with this email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User saved = userRepository.save(user);

        return new RegisterResponse(
                saved.getId(),
                saved.getName(),
                saved.getEmail(),
                saved.getCreatedAt()
        );
    }
}
