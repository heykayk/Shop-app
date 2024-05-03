package com.example.shopapp.services;

import com.example.shopapp.dtos.UserDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.models.Role;
import com.example.shopapp.models.User;
import com.example.shopapp.repositories.RoleRepository;
import com.example.shopapp.repositories.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService{
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    @Override
    public User createUser(UserDTO userDTO) throws DataNotFoundException {
        String phoneNumber = userDTO.getPhoneNumber();
        // Kểm tra xem phoneNumber đã tồn tại chưa
        if(userRepository.existsByPhoneNumber(phoneNumber)){
            throw new DataIntegrityViolationException("Phone number already exists");
        }

        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .phoneNumber(userDTO.getPhoneNumber())
                .password(userDTO.getPassword())
                .address(userDTO.getAddress())
                .dateOfBirth(userDTO.getDateOfBirth())
                .facebookAccountId(userDTO.getFacebookAccountId())
                .googleAccountId(userDTO.getGoogleAccountId())
                .build();
        Optional<Role> roleOptional = roleRepository.findById(userDTO.getRoleId());
        Role role = roleOptional.orElseThrow(() -> new DataNotFoundException("Role not found"));
        newUser.setRole(role);

        // kiểm tra xem, nếu có accountId thì khoong yêu cầu mật khẩu
        if (userDTO.getFacebookAccountId() == 0 && userDTO.getGoogleAccountId() == 0){
            String password = userDTO.getPassword();

        }
        return userRepository.save(newUser);
    }

    @Override
    public String login(String phoneNumber, String password) {


        return null;
    }
}
