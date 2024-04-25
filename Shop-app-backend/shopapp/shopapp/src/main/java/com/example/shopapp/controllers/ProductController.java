package com.example.shopapp.controllers;

import com.example.shopapp.dtos.CategoryDto;
import com.example.shopapp.dtos.ProductDto;
import jakarta.validation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @GetMapping("")
    public ResponseEntity<String> getProduct(
        @RequestParam("page") int page,
        @RequestParam("limit") int limit
    ){
        return ResponseEntity.ok("get product here");
    }

    @PostMapping("")
    // nếu đối tượng trả ve là 1 object
    public ResponseEntity<?> insertCategory(@Valid @RequestBody ProductDto productDto,
                                            BindingResult result){
        try{
            if(result.hasErrors()){
                List<String> errorMessages =  result.getAllErrors()
                        .stream()
                        .map(ObjectError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            return ResponseEntity.ok("Product name = " + productDto.getName());
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getProductById(@PathVariable("id") Long productId){
        return ResponseEntity.ok("Product is " + productId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id){
        return ResponseEntity.ok("update product with id = " + id);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        return ResponseEntity.ok("delete product with id = " + id);
    }
}
