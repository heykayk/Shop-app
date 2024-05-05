package com.example.shopapp.responses;

import com.example.shopapp.models.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse extends BaseRespone {
    private long id;

    @JsonProperty("user_id")
    private User user;

    @JsonProperty("fullname")
    private String fullName;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private String address;

    private String note;

    @JsonProperty("order_date")
    private LocalDateTime orderDate;

    private String status;

    @JsonProperty("total_money")
    private Float totalMoney;
}
