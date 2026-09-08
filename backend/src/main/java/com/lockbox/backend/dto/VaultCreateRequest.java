package com.lockbox.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VaultCreateRequest {

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @NotBlank(message = "Type cannot be empty")
    private String type;

    private String username;

    private String website;

    @NotBlank(message = "Secret cannot be empty")
    private String secret;
}