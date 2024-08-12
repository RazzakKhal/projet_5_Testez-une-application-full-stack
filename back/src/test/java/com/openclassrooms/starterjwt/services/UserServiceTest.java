package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class UserServiceTest {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp(){
        // création d'un utiliseur en bdd
        User user = new User("razzaktest@example.com", "razz", "khal", passwordEncoder.encode("password123"), false);
        userRepository.saveAndFlush(user);

    }
    @AfterEach
    void setDown(){
        Optional<User> user = userRepository.findByEmail("razzaktest@example.com");
        if(user.isPresent()){
            userRepository.deleteById(user.get().getId());
        }
    }
    @Test
    void testDeleteById_Success(){
        Optional<User> user = userRepository.findByEmail("razzaktest@example.com");
        if(user.isPresent()){
            assertTrue(userRepository.findById(user.get().getId()).isPresent());
            userService.delete(user.get().getId());
            assertFalse(userRepository.findById(user.get().getId()).isPresent());
        }

    }
    @Test
    void testFindById(){
        Optional<User> user = userRepository.findByEmail("razzaktest@example.com");
        if(user.isPresent()){
            Optional<User> user2 = userRepository.findById(user.get().getId());
            assertTrue(user2.isPresent());
            assertEquals(user2.get().getEmail(), user.get().getEmail());
        }

    }
}