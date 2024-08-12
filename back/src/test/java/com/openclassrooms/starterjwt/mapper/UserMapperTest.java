package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class UserMapperTest {
    @Autowired
    UserMapper userMapper;
    private User user;

    private UserDto userDto;
    @BeforeEach
    void setUp(){
        user = new User();
        user.setId(1L);
        user.setEmail("khalfallah@gmail.com");
        user.setPassword("Admin1234!");
        user.setAdmin(true);
        user.setFirstName("Razzak");
        user.setLastName("Khalfallah");
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userDto = new UserDto();
        userDto.setFirstName("Razzak");
        userDto.setLastName("Khalfallah");
        userDto.setEmail("khalfallah@gmail.com");
        userDto.setPassword("Admin1234!");
        userDto.setAdmin(true);
    }
    @Test
    void testToDto(){
        UserDto userDto1 = userMapper.toDto(user);
        assertEquals(userDto1.getEmail(), user.getEmail());
        assertEquals(userDto1.getFirstName(), user.getFirstName());
        assertEquals(userDto1.getLastName(), user.getLastName());
        assertEquals(userDto1.getPassword(), user.getPassword());
        assertEquals(userDto1.isAdmin(), user.isAdmin());
    }
    @Test
    void testToEntity(){

        User user1 = userMapper.toEntity(userDto);
        assertEquals(user1.getEmail(), userDto.getEmail());
        assertEquals(user1.getFirstName(), userDto.getFirstName());
        assertEquals(user1.getLastName(), userDto.getLastName());
        assertEquals(user1.getPassword(), userDto.getPassword());
        assertEquals(user1.isAdmin(), userDto.isAdmin());
    }
}