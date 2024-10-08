package com.example.shopapp.services.impl;

import com.example.shopapp.dtos.OrderDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Order;
import com.example.shopapp.responses.OrderResponse;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws Exception;
    Order getOrder(Long id) throws DataNotFoundException;
    Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException;
    void deleteOrder(Long id);
    List<Order> findByUserId(Long userId);
    org.springframework.data.domain.Page<OrderResponse> getOrdersByKeyword(String keyword, PageRequest pageRequest);
}
