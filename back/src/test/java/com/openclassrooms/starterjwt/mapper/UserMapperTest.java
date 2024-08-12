package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class UserMapperTest {
    @Autowired
    UserMapper userMapper;
    private User user;

    private UserDto userDto;

    private List<User> userList;
    private List<UserDto> userDtoList;
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

        userList = new ArrayList<>();
        userList.add(user);

        userDtoList = new ArrayList<>();
        userDtoList.add(userDto);
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

    @Test
    void testToDtoList() {
        List<UserDto> userDtoList1 = userMapper.toDto(userList);

        assertEquals(userDtoList.size(), userDtoList1.size());
        assertEquals(userDtoList1.get(0).getEmail(), userList.get(0).getEmail());
        assertEquals(userDtoList1.get(0).getFirstName(), userList.get(0).getFirstName());
        assertEquals(userDtoList1.get(0).getLastName(), userList.get(0).getLastName());
        assertEquals(userDtoList1.get(0).getPassword(), userList.get(0).getPassword());
        assertEquals(userDtoList1.get(0).isAdmin(), userList.get(0).isAdmin());
    }

    @Test
    void testToEntityList() {
        List<User> userList1 = userMapper.toEntity(userDtoList);

        assertEquals(userList.size(), userList1.size());
        assertEquals(userList1.get(0).getEmail(), userDtoList.get(0).getEmail());
        assertEquals(userList1.get(0).getFirstName(), userDtoList.get(0).getFirstName());
        assertEquals(userList1.get(0).getLastName(), userDtoList.get(0).getLastName());
        assertEquals(userList1.get(0).getPassword(), userDtoList.get(0).getPassword());
        assertEquals(userList1.get(0).isAdmin(), userDtoList.get(0).isAdmin());
    }
}