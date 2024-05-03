package com.example.shopapp.controllers;

import com.example.shopapp.dtos.UserDTO;
import com.example.shopapp.dtos.UserLoginDTO;
import com.example.shopapp.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService iUserService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserDTO userDTO,
            BindingResult result){
        try{
            if(result.hasErrors()){
                List<String> errorMesages = result.getAllErrors()
                        .stream()
                        .map(ObjectError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMesages);
            }
            if(!userDTO.getPassword().equals(userDTO.getRetypePassword())){
                return ResponseEntity.badRequest().body("Password dose not match");
            }
            iUserService.createUser(userDTO);
            return ResponseEntity.ok("Register successfully");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody UserLoginDTO userLoginDTO
    ){
        String token = iUserService.login(userLoginDTO.getPhoneNumber(), userLoginDTO.getPassword());
        return ResponseEntity.ok("Login success");
    }
}
