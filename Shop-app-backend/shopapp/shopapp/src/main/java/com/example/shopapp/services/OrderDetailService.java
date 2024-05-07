package com.example.shopapp.services;

import com.example.shopapp.dtos.OrderDetailDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Order;
import com.example.shopapp.models.OrderDetail;
import com.example.shopapp.models.Product;
import com.example.shopapp.repositories.OrderDetailRepository;
import com.example.shopapp.repositories.OrderRepository;
import com.example.shopapp.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderDetailService implements IOrderDetailService{
    public final OrderRepository orderRepository;
    public final OrderDetailRepository orderDetailRepository;
    public final ProductRepository productRepository;
    @Override
    public OrderDetail creatOrderDetail(OrderDetailDTO orderDetailDTO) throws Exception{
        Order order = orderRepository
                .findById(orderDetailDTO.getOrderId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find order with id =" + orderDetailDTO.getOrderId()));

        Product product = productRepository
                .findById(orderDetailDTO.getProductId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find product with id = " + orderDetailDTO.getProductId()));

        OrderDetail orderDetail = OrderDetail
                .builder()
                .order(order)
                .product(product)
                .price(orderDetailDTO.getPrice())
                .numberOfProducts(orderDetailDTO.getNumberOfProducts())
                .totalMoney(orderDetailDTO.getTotalMoney())
                .color(orderDetailDTO.getColor())
                .build();
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public OrderDetail getOrderDetail(Long id) throws DataNotFoundException {
        OrderDetail existingOrderDetail = orderDetailRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find order detail with id = "+id));
        return existingOrderDetail;
    }

    @Override
    public OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) throws DataNotFoundException {
        OrderDetail existingOrderDetail = orderDetailRepository
                .findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find order detail with id = " + id));

        Order order = orderRepository
                .findById(orderDetailDTO.getOrderId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find order with id =" + orderDetailDTO.getOrderId()));

        Product product = productRepository
                .findById(orderDetailDTO.getProductId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find product with id = " + orderDetailDTO.getProductId()));

        existingOrderDetail.setOrder(order);
        existingOrderDetail.setProduct(product);
        existingOrderDetail.setPrice(orderDetailDTO.getPrice());
        existingOrderDetail.setNumberOfProducts(orderDetailDTO.getNumberOfProducts());
        existingOrderDetail.setTotalMoney(orderDetailDTO.getTotalMoney());
        existingOrderDetail.setColor(orderDetailDTO.getColor());

        return orderDetailRepository.save(existingOrderDetail);
    }

    @Override
    public void deleteOrderDetail(Long id) {
        Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(id);
        if(optionalOrderDetail.isPresent()){
            orderDetailRepository.delete(optionalOrderDetail.get());
        }
    }

    @Override
    public List<OrderDetail> findByOrderId(Long orderId) {
        List<OrderDetail> orderDetails= orderDetailRepository.findByOrderId(orderId);
        return orderDetails;
    }
}
