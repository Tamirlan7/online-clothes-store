package com.tami.online.store.dto;

import com.tami.online.store.model.Order;
import com.tami.online.store.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetOrdersResponse {

    Order order;

    List<Product> products;

}
