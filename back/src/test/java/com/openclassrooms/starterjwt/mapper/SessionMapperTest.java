package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.TeacherService;
import com.openclassrooms.starterjwt.services.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class SessionMapperTest {
    @Autowired
    SessionMapper sessionMapper;
    @MockBean
    UserService userService;
    @MockBean
    TeacherService teacherService;


    Session session;

    SessionDto sessionDto;
    @BeforeEach
    void setUp(){


        List<Long> usersId = new ArrayList<>();
        usersId.add(1L);
        sessionDto = new SessionDto();
        sessionDto.setDescription("Test description");
        sessionDto.setTeacher_id(1L);
        sessionDto.setUsers(usersId);

        List<User> users = new ArrayList<>();
        users.add(new User());
        session = new Session();
        session.setDescription("Test description");
        session.setTeacher(new Teacher());
        session.setUsers(users);
    }
    @Test
    void testToEntity(){
        when(teacherService.findById(1L)).thenReturn(new Teacher());
        when(userService.findById(1L)).thenReturn(new User());

        Session session = sessionMapper.toEntity(sessionDto);

        assertEquals("Test description", session.getDescription());
        assertEquals(1, session.getUsers().size());

    }
    @Test
    void testToDto(){
        SessionDto sessionDto = sessionMapper.toDto(session);

        assertEquals("Test description", sessionDto.getDescription());
        assertEquals(1, sessionDto.getUsers().size());
    }
}