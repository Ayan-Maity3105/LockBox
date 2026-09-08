package com.lockbox.backend.controller;

import com.lockbox.backend.dto.VaultCreateRequest;
import com.lockbox.backend.dto.VaultResponse;
import com.lockbox.backend.dto.VaultUpdateRequest;
import com.lockbox.backend.entity.User;
import com.lockbox.backend.service.VaultService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vault")
public class VaultController {

    private final VaultService vaultService;

    public VaultController(VaultService vaultService) {
        this.vaultService = vaultService;
    }

    // create
    @PostMapping
    public ResponseEntity<VaultResponse> createVaultItem(
            @Valid @RequestBody VaultCreateRequest request,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        VaultResponse response =
                vaultService.createVaultItem(request, user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // get all
    @GetMapping
    public ResponseEntity<List<VaultResponse>> getAllVaultItems(
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                vaultService.getAllVaultItems(user)
        );
    }

    // get one
    @GetMapping("/{id}")
    public ResponseEntity<VaultResponse> getVaultItem(
            @PathVariable Long id,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                vaultService.getVaultItem(id, user)
        );
    }

    // update
    @PutMapping("/{id}")
    public ResponseEntity<VaultResponse> updateVaultItem(
            @PathVariable Long id,
            @Valid @RequestBody VaultUpdateRequest request,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                vaultService.updateVaultItem(
                        id,
                        user,
                        request
                )
        );
    }

    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVaultItem(
            @PathVariable Long id,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        vaultService.deleteVaultItem(id, user);

        return ResponseEntity.noContent().build();
    }
}