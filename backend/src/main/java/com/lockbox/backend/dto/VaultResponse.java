package com.lockbox.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class VaultResponse {

    private Long id;
    private String title;
    private String type;
    private String username;
    private String website;
    private String secret;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}