package com.example.shopapp.responses;

import com.example.shopapp.models.Product;
import com.example.shopapp.models.ProductImage;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse extends BaseRespone{
    private Long id;
    private String name;
    private Float price;
    private String thumbnail;
    private String description;

    @JsonProperty("category_id")
    private Long categoryId;

    @JsonProperty("product_images")
    private List<ProductImageResponse> productImages;

    public static ProductResponse fromProduct(Product product){
        ProductResponse productResponse = ProductResponse
                .builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .thumbnail(product.getThumbnail())
                .description(product.getDescription())
                .categoryId(product.getCategory().getId())
                .productImages(product.getProductImages() == null? new ArrayList<>() :
                        product
                        .getProductImages()
                        .stream()
                        .map(productImage -> new ProductImageResponse(productImage.getId(), productImage.getImageUrl()))
                        .collect(Collectors.toList())
                )
                .build();
        productResponse.setUpdatedAt(product.getUpdatedAt());
        productResponse.setCreatedAt(product.getCreatedAt());
        return productResponse;
    }
}
