package com.example.shopapp.services.impl;

import com.example.shopapp.dtos.UserDTO;
import com.example.shopapp.dtos.UserUpdateDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.User;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    String login(String phoneNumber, String password, Long roleId) throws Exception;
    User getUserDetailFromToken(String token) throws Exception;
    User updateUser(Long userId, UserUpdateDTO userUpdateDto) throws Exception;
}
