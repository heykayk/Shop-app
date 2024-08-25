package com.example.shopapp.services;

import com.example.shopapp.components.JwtTokenUtils;
import com.example.shopapp.components.LocalizationUtils;
import com.example.shopapp.dtos.UserDTO;
import com.example.shopapp.dtos.UserUpdateDTO;
import com.example.shopapp.exceptions.DataNotFoundException;
import com.example.shopapp.exceptions.PermissionDenyException;
import com.example.shopapp.models.Role;
import com.example.shopapp.models.User;
import com.example.shopapp.repositories.RoleRepository;
import com.example.shopapp.repositories.UserRepository;
import com.example.shopapp.services.impl.IUserService;
import com.example.shopapp.utils.MessageKeys;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtils jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final LocalizationUtils localizationUtils;
    @Override
    @Transactional
    public User createUser(UserDTO userDTO) throws Exception {
        // register user
        String phoneNumber = userDTO.getPhoneNumber();
        // Kểm tra xem phoneNumber đã tồn tại chưa
        if(userRepository.existsByPhoneNumber(phoneNumber)){
            throw new DataIntegrityViolationException("Phone number already exists");
        }
        Optional<Role> roleOptional = roleRepository.findById(userDTO.getRoleId());
        Role role = roleOptional.orElseThrow(() -> new DataNotFoundException("Role not found"));
        if(role.getName().toUpperCase().equals(Role.ADMIN)){
            throw new PermissionDenyException("you cannot register admin account");
        }

        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .phoneNumber(userDTO.getPhoneNumber())
                .password(userDTO.getPassword())
                .address(userDTO.getAddress())
                .isActive(true)
                .dateOfBirth(userDTO.getDateOfBirth())
                .facebookAccountId(userDTO.getFacebookAccountId())
                .googleAccountId(userDTO.getGoogleAccountId())
                .build();
        newUser.setRole(role);

        // kiểm tra xem, nếu có accountId thì khoong yêu cầu mật khẩu
        if (userDTO.getFacebookAccountId() == 0 && userDTO.getGoogleAccountId() == 0){
            String password = userDTO.getPassword();
            String passwordEncoded = passwordEncoder.encode(password);
            newUser.setPassword(passwordEncoded);
        }
        return userRepository.save(newUser);
    }

    @Override
    public String login(String phoneNumber, String password, Long roleId) throws Exception {
        Optional<User> optionalUser = userRepository.findAllByPhoneNumber(phoneNumber);
        if(!optionalUser.isPresent()){
            throw new DataNotFoundException("Invalid phonenumber / password");
        }
        User existingUser = optionalUser.get();
        // check password
        if(existingUser.getFacebookAccountId() == 0
                &&  existingUser.getGoogleAccountId() == 0){
            if(!passwordEncoder.matches(password, existingUser.getPassword())){
                throw new BadCredentialsException(localizationUtils.getLocalizationMessage(MessageKeys.WRONG_PHONE_PASSWORD));
            }
        }

        Optional<Role> optionalRole = roleRepository.findById(roleId);
        if(!optionalRole.isPresent() || !roleId.equals(existingUser.getRole().getId())){
            throw new BadCredentialsException(localizationUtils.getLocalizationMessage(MessageKeys.WRONG_PHONE_PASSWORD));
        }
        System.out.println(existingUser.getFullName());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                phoneNumber, password,
                existingUser.getAuthorities()
        );
        // authenticate with java Spring Security
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(existingUser);
    }

    @Override
    public User getUserDetailFromToken(String token) throws Exception {
        if(jwtTokenUtil.isTokenExpired(token)){
            throw  new Exception("Token is expired");
        }
        String phoneNumber = jwtTokenUtil.extractPhoneNumber(token);
        Optional<User> user = userRepository.findAllByPhoneNumber(phoneNumber);

        if(user.isPresent()){
            return user.get();
        } else {
            throw new Exception("User not found!");
        }
    }

    @Override
    @Transactional
    public User updateUser(Long userId, UserUpdateDTO userUpdateDTO) throws Exception {
        // Tìm user theo id
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        // Kiểm tra số điện thoại mới nếu có thay đổi
        String newPhoneNumber = userUpdateDTO.getPhoneNumber();
        if (newPhoneNumber != null && !newPhoneNumber.equals(existingUser.getPhoneNumber())) {
            if (userRepository.existsByPhoneNumber(newPhoneNumber)) {
                throw new DataIntegrityViolationException("Phone number already exists");
            }
            existingUser.setPhoneNumber(newPhoneNumber);
        }

        // Cập nhật tên đầy đủ nếu có
        if (userUpdateDTO.getFullName() != null) {
            existingUser.setFullName(userUpdateDTO.getFullName());
        }

        // Cập nhật địa chỉ nếu có
        if (userUpdateDTO.getAddress() != null) {
            existingUser.setAddress(userUpdateDTO.getAddress());
        }

        // Cập nhật ngày sinh nếu có
        if (userUpdateDTO.getDateOfBirth() != null) {
            existingUser.setDateOfBirth(userUpdateDTO.getDateOfBirth());
        }

        // Cập nhật facebookAccountId nếu có
        if (userUpdateDTO.getFacebookAccountId() > 0) {
            existingUser.setFacebookAccountId(userUpdateDTO.getFacebookAccountId());
        }

        // Cập nhật googleAccountId nếu có
        if (userUpdateDTO.getGoogleAccountId() > 0) {
            existingUser.setGoogleAccountId(userUpdateDTO.getGoogleAccountId());
        }

        // Cập nhật mật khẩu nếu có và không phải đăng nhập qua Facebook/Google
        if (userUpdateDTO.getPassword() != null && userUpdateDTO.getFacebookAccountId() == 0 && userUpdateDTO.getGoogleAccountId() == 0) {
            String passwordEncoded = passwordEncoder.encode(userUpdateDTO.getPassword());
            existingUser.setPassword(passwordEncoded);
        }

        // Lưu user đã cập nhật
        return userRepository.save(existingUser);
    }

}
