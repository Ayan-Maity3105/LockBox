package com.lockbox.backend.repository;

import com.lockbox.backend.entity.User;
import com.lockbox.backend.entity.VaultItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VaultItemRepository extends JpaRepository<VaultItem, Long> {
    List<VaultItem> findByUser(User user);

    Optional<VaultItem> findByIdAndUser(Long id, User user);
}
