package com.example.shopapp.services;

import com.example.shopapp.dtos.OrderDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Order;
import com.example.shopapp.models.OrderStatus;
import com.example.shopapp.models.User;
import com.example.shopapp.repositories.OrderRepository;
import com.example.shopapp.repositories.UserRepository;
import com.example.shopapp.responses.OrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService{
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    @Override
    public OrderResponse createOrder(OrderDTO orderDTO) throws Exception {
        Optional<User> optionalUser = userRepository.findById(orderDTO.getUserId());
        User user = optionalUser.orElseThrow(() -> new DataNotFoundException("Cannot find user with id  = " + orderDTO.getUserId()));

        Order order = Order
                .builder()
                .user(user)
                .fullName(orderDTO.getFullName())
                .email(orderDTO.getEmail())
                .phoneNumber(orderDTO.getPhoneNumber())
                .address(orderDTO.getAddress())
                .note(orderDTO.getNote())
                .totalMoney(orderDTO.getTotalMoney())
                .shippingMethod(orderDTO.getShippingMethod())
                .shippingAddress(orderDTO.getShippingAddress())
                .paymentMethod(orderDTO.getPaymentMethod())
                .active(true)
                .build();

        order.setOrderDate(new Date());
        order.setStatus(OrderStatus.PENDING);

        Date shippingDate = orderDTO.getShippingDate();
        if(shippingDate == null || shippingDate.before(new Date())){
            throw new DataNotFoundException("Date must be at least today!");
        }

        orderRepository.save(order);
        return OrderResponse
                .builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .fullName(order.getFullName())
                .phoneNumber(order.getPhoneNumber())
                .address(order.getAddress())
                .note(order.getNote())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .totalMoney(order.getTotalMoney())
                .build();
    }

    @Override
    public OrderResponse getOrder(Long id) {
        return null;
    }

    @Override
    public OrderResponse updateOrder(Long id, OrderDTO orderDTO) {
        return null;
    }

    @Override
    public void deleteOrder(Long id) {

    }

    @Override
    public List<OrderResponse> getAllOrders(Long userId) {
        return null;
    }
}
