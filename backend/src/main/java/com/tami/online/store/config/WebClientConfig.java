package com.tami.online.store.config;

import io.netty.handler.codec.http.HttpHeaderValues;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.http.HttpClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient tinkoffClient() {
        return WebClient.builder()
                .baseUrl("https://securepay.tinkoff.ru/v2")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_JSON.toString())
                .build();
    }

}
