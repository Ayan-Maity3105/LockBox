package com.lockbox.backend.service;

import com.lockbox.backend.dto.VaultCreateRequest;
import com.lockbox.backend.dto.VaultResponse;
import com.lockbox.backend.dto.VaultUpdateRequest;
import com.lockbox.backend.encryption.EncryptionService;
import com.lockbox.backend.entity.User;
import com.lockbox.backend.entity.VaultItem;
import com.lockbox.backend.exception.ResourceNotFoundException;
import com.lockbox.backend.repository.VaultItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VaultService {
    private final VaultItemRepository vaultItemRepository;
    private final EncryptionService encryptionService;

    public VaultService(VaultItemRepository vaultItemRepository, EncryptionService encryptionService) {
        this.vaultItemRepository = vaultItemRepository;
        this.encryptionService = encryptionService;
    }

    // create
    public VaultResponse createVaultItem(VaultCreateRequest request, User user) {
        VaultItem item = new VaultItem();
        item.setTitle(request.getTitle());
        item.setType(request.getType());
        item.setUsername(request.getUsername());
        item.setWebsite(request.getWebsite());

        // encrypt the text before storing
        item.setEncryptedSecret(encryptionService.encrypt(request.getSecret()));

        // set owner
        item.setUser(user);

        VaultItem savedItem = vaultItemRepository.save(item);

        return convertToResponse(savedItem);
    }

    // get All
    public List<VaultResponse> getAllVaultItems(User user) {
        List<VaultItem> items = vaultItemRepository.findByUser(user);

        return items.stream()
                .map(this::convertToResponse)
                .toList();
    }

    // get one
    public VaultResponse getVaultItem(Long vaultId, User user) {
        VaultItem item = vaultItemRepository.findByIdAndUser(vaultId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Vault Item not found"));

        return convertToResponse(item);
    }

    // update
    public VaultResponse updateVaultItem(Long vaultId, User user, VaultUpdateRequest request) {
        VaultItem item = vaultItemRepository.findByIdAndUser(vaultId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Vault Item not found"));

        item.setTitle(request.getTitle());
        item.setType(request.getType());
        item.setUsername(request.getUsername());
        item.setWebsite(request.getWebsite());

        // Re-encrypt updated secret
        item.setEncryptedSecret(
                encryptionService.encrypt(request.getSecret())
        );

        VaultItem updatedItem = vaultItemRepository.save(item);

        return convertToResponse(updatedItem);
    }

    // delete
    public void deleteVaultItem(Long id, User user) {

        VaultItem item = vaultItemRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Vault item not found"));

        vaultItemRepository.delete(item);
    }

    // entity to response
    public VaultResponse convertToResponse(VaultItem item) {
        String decryptedSecret = encryptionService.decrypt(item.getEncryptedSecret());

        return new VaultResponse(
                item.getId(),
                item.getTitle(),
                item.getType(),
                item.getUsername(),
                item.getWebsite(),
                decryptedSecret,
                item.getCreatedAt(),
                item.getUpdatedAt()
        );
    }
}
