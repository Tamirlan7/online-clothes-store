package com.tami.online.store.config;

import com.tami.online.store.model.*;
import com.tami.online.store.repository.ClothingTypeRepository;
import com.tami.online.store.repository.CollectionRepository;
import com.tami.online.store.repository.ProductSizeRepository;
import com.tami.online.store.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AppInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClothingTypeRepository clothingTypeRepository;
    private final CollectionRepository collectionRepository;
    private final ProductSizeRepository productSizeRepository;

    @Override
    public void run(String... args) {
        userRepository.save(
                User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .role(Role.ROLE_ADMIN)
                        .build()
        );

        this.initClothingTypes();
        this.initCollections();
        this.initSizes();
    }

    private void initSizes() {
        List<String> sizes = List.of(
                "S",
                "M",
                "L",
                "XL"
        );

        sizes.forEach((size) -> {
            productSizeRepository.save(
                    ProductSize.builder()
                            .name(size)
                            .build()
            );
        });
    }

    private void initCollections() {
        List<String> collections = List.of(
            "Alternative edge",
            "Uncriders"
        );

        collections.forEach((collection) -> {
            collectionRepository.save(
                    Collection.builder()
                            .name(collection)
                            .build()
            );
        });
    }

    private void initClothingTypes() {
        List<String> clothingTypes = List.of(
                "T-Shirts/long",
                "Jersey",
                "Hoodie/Zip-hoodie",
                "Pants/Shorts"
        );

        clothingTypes.forEach((clothingType) -> {
            clothingTypeRepository.save(
                    ClothingType.builder()
                            .name(clothingType)
                            .build()
            );
        });
    }
}
