package com.tami.online.store.service;

import com.tami.online.store.dto.GetOrdersResponse;
import com.tami.online.store.dto.TinkoffInitRequest;
import com.tami.online.store.dto.TinkoffInitResponse;
import com.tami.online.store.exception.CustomBadRequestException;
import com.tami.online.store.model.Order;
import com.tami.online.store.model.OrderItem;
import com.tami.online.store.model.Product;
import com.tami.online.store.model.ProductSize;
import com.tami.online.store.repository.OrderRepository;
import com.tami.online.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderService {

    @Value("${tinkoff.terminalKey}")
    private String terminalKey;

    @Value("${tinkoff.password}")
    private String password;

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderService.class);
    private final WebClient tinkoffClient;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public List<GetOrdersResponse> getOrders() {
        return orderRepository.findAll().stream().map(order -> GetOrdersResponse.builder()
                .order(order)
                .products(productRepository.findAllById(order.getOrderItems().stream().map(OrderItem::getProductId).toList()))
                .build()).toList();
    }

    public Order create(Order order) {
        boolean paymentSuccess = true;

        if (paymentSuccess) {

            for (OrderItem item : order.getOrderItems()) {
                Product product = productRepository.findById(item.getProductId())
                        .orElseThrow(() -> new CustomBadRequestException("orderItem contains non-existent product id " + item.getProductId()));

                // decrement product quantity in the stock
                for (ProductSize size : product.getProductSizes()) {
                    if (size.getSize().equalsIgnoreCase(item.getProductSize())) {
                        size.setQuantity(size.getQuantity() - 1);
                        break;
                    }
                }

                productRepository.save(product);
            }
        }

        return orderRepository.save(order);
    }

    public Object create() {
//        Order sOrder = orderRepository.save(order);

//        StringBuilder description = new StringBuilder("Покупка товаров с id [");
//        for (OrderItem ord : order.getOrderItems()) {
//            description.append(ord.getId().toString());
//            description.append(", ");
//        }
//        description.append("]");

        TinkoffInitRequest body = TinkoffInitRequest.builder()
                .terminalKey(terminalKey)
                .orderId("21")
                .description("Проверка")
                .amount(300 * 100L)
                .data(new HashMap<>())
                .receipt(Map.of(
                        "Items", List.of(Map.of("Name", "Наименование товара", "Price", 300 * 100L, "Quantity", 2))
                ))
                .build();

        String token = generateTinkoffToken(body);
        body.setToken(token);


        return tinkoffClient.post()
                .uri("/Init")
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(body), TinkoffInitRequest.class)
                .retrieve()
                .bodyToMono(TinkoffInitResponse.class)
                .doOnError((ex) -> {
                    LOGGER.error(ex.getMessage(), ex);
                    throw new CustomBadRequestException(ex.getMessage());
                })
                .block();
    }

    private String generateTinkoffToken(TinkoffInitRequest request) {
        List<Map<String, Object>> tokenList = new ArrayList<>(List.of(
                Map.of("TerminalKey", request.getTerminalKey()),
                Map.of("OrderId", request.getOrderId()),
                Map.of("Amount", request.getAmount()),
                Map.of("Description", request.getDescription()),
                Map.of("Password", password)
        ));

        tokenList.sort(Comparator.comparing((Map<String, Object> map) -> map.keySet().iterator().next()));

        StringBuilder onlyValues = new StringBuilder();
        for (Map<String, Object> obj : tokenList) {
            for (Object value : obj.values()) {
                onlyValues.append(value.toString());
            }
        }

        return calculateSHA256(onlyValues.toString());
    }

    private static String calculateSHA256(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));

            // Преобразование байтов в строку
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new CustomBadRequestException(e.getMessage());
        }
    }

}
