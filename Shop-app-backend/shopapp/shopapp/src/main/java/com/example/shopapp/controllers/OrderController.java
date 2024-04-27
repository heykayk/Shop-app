package com.example.shopapp.controllers;

import com.example.shopapp.dtos.OrderDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
public class OrderController {
    @PostMapping("")
    public ResponseEntity<?> createOrder(
            @Valid @RequestBody OrderDTO orderDTO,
            BindingResult result
            ){
        try{
            if(result.hasErrors()){
                List<String> errorMessages = result.getAllErrors()
                        .stream()
                        .map(ObjectError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            return ResponseEntity.ok("Order create successfully");
        } catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<?> getOrders(
            @Valid @PathVariable("user_id") Long userId
    ){
        try{
            return ResponseEntity.ok("Orders of id = " + userId);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    // công việc của admin
    public ResponseEntity<?> updateOrder(
            @Valid @PathVariable Long id,
            @Valid @RequestBody OrderDTO orderDTO
    ){
        return ResponseEntity.ok("Update order successfully, id = " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(
            @Valid @PathVariable("id") Long id
    ){
        //  cập nhật trường active = false
        return ResponseEntity.ok("Order delete successfully, id = " + id);
    }
}
