package com.example.shopapp.services;

import com.example.shopapp.dtos.ProductDTO;
import com.example.shopapp.dtos.ProductImageDTO;
import com.example.shopapp.models.Product;
import com.example.shopapp.models.ProductImage;
import org.springframework.data.domain.PageRequest;

public interface IProductService {
    Product createProduct(ProductDTO productDTO) throws Exception;
    Product getProductById(Long id) throws Exception;
    org.springframework.data.domain.Page<Product> getAllProducts(PageRequest pageRequest);

    Product updateProduct(Long id, ProductDTO productDTO) throws Exception;
    void deleteProduct(Long id);
    boolean existsByName(String name);
    ProductImage createProductImage(Long productId, ProductImageDTO productImageDTO) throws Exception;
}
