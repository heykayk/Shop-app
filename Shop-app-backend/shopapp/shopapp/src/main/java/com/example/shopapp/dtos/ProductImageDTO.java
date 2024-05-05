package com.example.shopapp.dtos;

import com.example.shopapp.models.Product;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageDTO {
    @JsonProperty("product_id")
    @Min(value = 1, message = "Product's id must be >= 1")
    private Long productId;

    @JsonProperty("image_url")
    @Size(max = 200, min = 5, message = "Image's name")
    private String imageUrl;
}
