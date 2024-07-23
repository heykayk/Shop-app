package com.example.shopapp.services;

import com.example.shopapp.dtos.OrderDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Order;
import com.example.shopapp.models.OrderStatus;
import com.example.shopapp.models.User;
import com.example.shopapp.repositories.OrderRepository;
import com.example.shopapp.repositories.UserRepository;
import com.example.shopapp.services.impl.IOrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    @Override
    public Order createOrder(OrderDTO orderDTO) throws Exception {
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

        LocalDate shippingDate = orderDTO.getShippingDate() == null? LocalDate.now() : order.getShippingDate();
        if(shippingDate.isBefore(LocalDate.now())){
            throw new DataNotFoundException("Date must be at least today!");
        }

        return orderRepository.save(order);
    }

    @Override
    public Order getOrder(Long id) throws DataNotFoundException {
        return orderRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find order with od = " + id));
    }

    @Override
    @Transactional
    public Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException {
        Order existingOrder = orderRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find Order with id = " + id));

        User user = userRepository
                .findById(orderDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id = " + orderDTO.getUserId()));

        existingOrder.setFullName(orderDTO.getFullName());
        existingOrder.setEmail(orderDTO.getEmail());
        existingOrder.setPhoneNumber(orderDTO.getPhoneNumber());
        existingOrder.setAddress(orderDTO.getAddress());
        existingOrder.setNote(orderDTO.getNote());
        existingOrder.setTotalMoney(orderDTO.getTotalMoney());
        existingOrder.setShippingMethod(orderDTO.getShippingMethod());
        existingOrder.setShippingAddress(orderDTO.getShippingAddress());
        existingOrder.setPaymentMethod(orderDTO.getPaymentMethod());

        return orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id).orElse(null);
        if(order != null){
            order.setActive(false);
            orderRepository.save(order);
        }
    }

    @Override
    public List<Order> findByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}
