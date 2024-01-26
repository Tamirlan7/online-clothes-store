package com.tami.online.store.config;

import com.tami.online.store.model.*;
import com.tami.online.store.repository.ClothingTypeRepository;
import com.tami.online.store.repository.CollectionRepository;
import com.tami.online.store.repository.ProductRepository;
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
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        userRepository.save(
                User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .role(Role.ROLE_ADMIN)
                        .build()
        );

        initClothingTypes();
        initCollections();
        initProducts();
    }

    private void initClothingTypes() {
        List<String> clothingTypes = List.of(
                "Джерси",
                "Зип-худи",
                "Футболка",
                "Худи",
                "Галстук"
        );

        clothingTypes.forEach(c -> {
            clothingTypeRepository.save(
                    ClothingType.builder()
                            .name(c)
                            .build()
            );
        });

    }

    private void initCollections() {
        List<String> collections = List.of(
                "Alternative Edge",
                "Uncriders",
                "Advanced Gear"
        );

        collections.forEach(c -> {
            collectionRepository.save(
                    Collection.builder()
                            .name(c)
                            .build()
            );
        });
    }

    private void initProducts() {
        List<Product> products = new ArrayList<>();

        // 11111111111111111111111111111
        products.add(
                Product.builder()
                        .name("Jersey AEV2 // AW2023")
                        .price(3500)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (155-170)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (171-180)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (181-190)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Джерси").get())
                        .collection(collectionRepository.findByName("Alternative Edge").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/1/product_1_1.jpg")
                                        .name("product_1_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/1/product_1_2.jpg")
                                        .name("product_1_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/1/product_1_3.jpg")
                                        .name("product_1_3.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 222222222222222222222222
        products.add(
                Product.builder()
                        .name("Jersey Alternative Edge V2")
                        .price(3190)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (155-170)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (171-180)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (181-190)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Джерси").get())
                        .collection(collectionRepository.findByName("Alternative Edge").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/2/product_2_1.jpg")
                                        .name("product_2_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/2/product_2_2.jpg")
                                        .name("product_2_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/2/product_2_3.jpg")
                                        .name("product_2_3.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 33333333333333333333333333333333
        products.add(
                Product.builder()
                        .name("Zip-Hoodie Enfrared Scared")
                        .price(6200)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (165-172)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (173-179)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (180-186)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("XL (187-193)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Зип-худи").get())
                        .collection(collectionRepository.findByName("Alternative Edge").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/3/product_3_1.jpg")
                                        .name("product_3_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/3/product_3_2.jpg")
                                        .name("product_3_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/3/product_3_3.jpg")
                                        .name("product_3_3.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/3/product_3_3.jpg")
                                        .name("product_3_4.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 44444444444444444444444
        products.add(
                Product.builder()
                        .name("Jersey Alternative Edge")
                        .price(3190)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (165-172)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (173-179)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (180-186)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("XL (187-193)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Джерси").get())
                        .collection(collectionRepository.findByName("Alternative Edge").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/4/product_4_1.jpg")
                                        .name("product_4_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/4/product_4_2.jpg")
                                        .name("product_4_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/4/product_4_3.jpg")
                                        .name("product_4_3.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/4/product_4_3.jpg")
                                        .name("product_4_4.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 55555555555555555555555555555555555
        products.add(
                Product.builder()
                        .name("T-shirt Invictus Mindset")
                        .price(2200)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (155-170)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (171-180)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (181-190)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Футболка").get())
                        .collection(collectionRepository.findByName("Alternative Edge").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/5/product_5_1.jpg")
                                        .name("product_5_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/5/product_5_2.jpg")
                                        .name("product_5_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/5/product_5_3.jpg")
                                        .name("product_5_3.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/5/product_5_3.jpg")
                                        .name("product_5_4.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 66666666666666666666666666666
        products.add(
                Product.builder()
                        .name("T-shirt UNC2000")
                        .price(2200)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (155-170)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (171-180)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (181-190)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Футболка").get())
                        .collection(collectionRepository.findByName("Uncriders").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/6/product_6_1.jpg")
                                        .name("product_6_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/6/product_6_2.jpg")
                                        .name("product_6_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/6/product_6_3.jpg")
                                        .name("product_6_3.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/6/product_6_3.jpg")
                                        .name("product_6_4.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 7777777777777777777777777777777
        products.add(
                Product.builder()
                        .name("Jersey HOFv2 White")
                        .price(3190)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (155-170)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (171-180)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (181-190)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Джерси").get())
                        .collection(collectionRepository.findByName("Uncriders").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/7/product_7_1.jpg")
                                        .name("product_7_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/7/product_7_2.jpg")
                                        .name("product_7_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/7/product_7_3.jpg")
                                        .name("product_7_3.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/7/product_7_3.jpg")
                                        .name("product_7_4.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 8888888888888888888888888888888
        products.add(
                Product.builder()
                        .name("Jersey OutRace")
                        .price(3190)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (155-170)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (171-180)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (181-190)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Джерси").get())
                        .collection(collectionRepository.findByName("Uncriders").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/8/product_8_1.jpg")
                                        .name("product_8_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/8/product_8_2.jpg")
                                        .name("product_8_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/8/product_8_3.jpg")
                                        .name("product_8_3.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/8/product_8_3.jpg")
                                        .name("product_8_4.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 999999999999999999999999999
        products.add(
                Product.builder()
                        .name("Jersey HOF V2")
                        .price(3190)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S (155-170)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M (171-180)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L (181-190)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Джерси").get())
                        .collection(collectionRepository.findByName("Uncriders").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/9/product_9_1.jpg")
                                        .name("product_9_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/9/product_9_2.jpg")
                                        .name("product_9_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/9/product_9_3.jpg")
                                        .name("product_9_3.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/9/product_9_3.jpg")
                                        .name("product_9_4.jpg")
                                        .build()
                        ))
                        .build()
        );


        // 10 - 10 - 10 - 10 - 10
        products.add(
                Product.builder()
                        .name("Extra-Oversize Hoodie \"Падший Рыцарь\"")
                        .price(4890)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S — ширина/длина/рукав - 65/72/55 (на рост 165-175)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M — ширина/длина/рукав - 70/74/55 (на рост 175-185)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L — ширина/длина/рукав - 75/78/58 (на рост 185-195)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Худи").get())
                        .collection(collectionRepository.findByName("Advanced Gear").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/10/product_10_1.jpg")
                                        .name("product_10_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/10/product_10_2.jpg")
                                        .name("product_10_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/10/product_10_3.jpg")
                                        .name("product_10_3.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/10/product_10_3.jpg")
                                        .name("product_10_4.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 11 - 11 - 11 - 11 - 11 - 11
        products.add(
                Product.builder()
                        .name("Hoodie Expansion Gruppe")
                        .price(5790)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("S — ширина/длина/рукав - 60/72/55 (на рост 165-170)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("M — ширина/длина/рукав - 62/74/55 (на рост 170-180)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("L — ширина/длина/рукав - 65/76/58 (на рост 180-185)")
                                        .quantity(25)
                                        .build(),
                                ProductSize.builder()
                                        .size("XL — ширина/длина/рукав - 67/77/59 (на рост 185-190)")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Худи").get())
                        .collection(collectionRepository.findByName("Advanced Gear").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/11/product_11_1.jpg")
                                        .name("product_11_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/11/product_11_2.jpg")
                                        .name("product_11_2.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/11/product_11_3.jpg")
                                        .name("product_11_3.jpg")
                                        .build()
                        ))
                        .build()
        );

        // 12 - 12 - 12 - 12 - 12 - 12 - 12
        products.add(
                Product.builder()
                        .name("Necktie CAMO")
                        .price(1790)
                        .productSizes(List.of(
                                ProductSize.builder()
                                        .size("One Size")
                                        .quantity(25)
                                        .build()
                        ))
                        .clothingType(clothingTypeRepository.findByName("Галстук").get())
                        .collection(collectionRepository.findByName("Advanced Gear").get())
                        .productMediaFiles(List.of(
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/12/product_12_1.jpg")
                                        .name("product_12_1.jpg")
                                        .build(),
                                ProductMediaFile.builder()
                                        .type("image/jpeg")
                                        .path("files/product/12/product_12_2.jpg")
                                        .name("product_12_2.jpg")
                                        .build()
                        ))
                        .build()
        );

        products.forEach(product -> {
            product.getProductSizes().forEach(productSize -> productSize.setProduct(product));
            product.getProductMediaFiles().forEach(file -> file.setProduct(product));
        });

        productRepository.saveAll(products);
    }
}
