package com.example.shopapp.configrations;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelConfigration {
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
