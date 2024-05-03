package com.example.shopapp.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "orders")
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "fullname", length = 100)
    private String fullName;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phone_number", length = 20, nullable = false)
    private String phoneNumber;

    @Column(name = "address", length = 200, nullable = false)
    private String address;

    private String note;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "total_money")
    @Min(value = 0, message = "Total money must be greater than or equal to 0")
    private Float totalMoney;

    @Column(name = "shipping_method", length = 100)
    private String shippingMethod;

    @Column(name = "shipping_address", length = 200)
    private String shippingAddress;

    @Column(name = "shipping_date")
    private Date shippingDate;

    private boolean active;// thuộc về admin
}
