package com.openclassrooms.starterjwt.repository;

import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void shouldFindUserByMailAndExistReturnTrue(){

        User user = new User("khalfallah.razzak@gmail.com","khalfallah","razzak","Razzak12!",false);
        userRepository.saveAndFlush(user); // n'attends pas la fin de la méthode pour enregistrer en bdd

        Optional<User> userOpt = userRepository.findByEmail(user.getEmail());

        assertTrue(userRepository.existsByEmail(user.getEmail()));

        assertTrue(userOpt.isPresent());
        assertEquals(userOpt.get().getEmail(), user.getEmail());

    }

}