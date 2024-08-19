package com.example.shopapp.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

@Entity
@Table(name = "order_details")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "price")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private Float price;

    @Column(name = "number_of_products")
    @Min(value = 1,message = "Number of products must be greate than to 0")
    private int numberOfProducts;

    @Column(name = "total_money")
    @Min(value = 0, message = "Total money must be greate than or equal to 0")
    private Float totalMoney;

    private String color;
}
