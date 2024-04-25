package com.example.shopapp.controllers;

import com.example.shopapp.dtos.CategoryDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/categories")
//@Validated
public class CategoryController {
    // get all categories
    @GetMapping("")
    public ResponseEntity<String> getAllCategories(
            @RequestParam("page") int page,
            @RequestParam("limit") int limit
    ){
        return ResponseEntity.ok(String.format("getAllCategory, page = %d, limit = %d", page, limit));
    }

    @PostMapping("")
    // nếu đối tượng trả ve là 1 object
    public ResponseEntity<?> insertCategory(@Valid @RequestBody CategoryDto categoryDto,
                                                 BindingResult result){
        if(result.hasErrors() == true){
            List<String>  errorMessages = result.getAllErrors()
                    .stream()
                    .map(ObjectError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessages);
        }
        return ResponseEntity.ok("Hello " + categoryDto.getName());
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Long id){
        return ResponseEntity.ok("update category with id = " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id){
        return ResponseEntity.ok("delete category with id = " + id);
    }
}
