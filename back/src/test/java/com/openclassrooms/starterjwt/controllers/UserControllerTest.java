package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "khalfallah@gmail.com", roles = "ADMIN")
class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    UserMapper userMapper;
    @MockBean
    UserService userService;

    User user;

    UserDto userDto;
    @BeforeEach
    void setUp(){
        user = new User();
        user.setId(1L);
        user.setEmail("khalfallah@gmail.com");
        user.setPassword("Admin1234!");
        user.setAdmin(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userDto = new UserDto();
        userDto.setEmail("khalfallah@gmail.com");
        userDto.setPassword("Admin1234!");
        userDto.setAdmin(true);
    }

    @Test
    void testFindById_Success() throws Exception {
        when(userService.findById(anyLong())).thenReturn(user);
        when(userMapper.toDto(any(User.class))).thenReturn(userDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("khalfallah@gmail.com"));
    }

    @Test
    void testFindById_BadRequest() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/invalid-id"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testFindById_NotFound() throws Exception {
        when(userService.findById(anyLong())).thenReturn(null);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/1"))
                .andExpect(status().isNotFound());
    }
    @Test
    void testDeleteById_Success() throws Exception{
        when(userService.findById(anyLong())).thenReturn(user);
        doNothing().when(userService).delete(anyLong());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/user/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteById_NotFound() throws Exception {
        when(userService.findById(anyLong())).thenReturn(null);
        doNothing().when(userService).delete(anyLong());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/user/1"))
                .andExpect(status().isNotFound());
    }
}