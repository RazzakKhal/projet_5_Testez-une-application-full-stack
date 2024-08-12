package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class TeacherServiceTest {
    @Autowired
    TeacherRepository teacherRepository;
    @Autowired
    TeacherService teacherService;
    @BeforeEach
    void setUp(){
        Teacher teacher = new Teacher();
        teacher.setFirstName("Razzak");
        teacher.setLastName("Khalfallah");

        teacherRepository.saveAndFlush(teacher);
    }
    @Test
    void testFindAll_Success(){
        List<Teacher> teacherList = teacherService.findAll();
        assertEquals(teacherList.get(0).getFirstName(), "Razzak");
        assertEquals(teacherList.get(0).getLastName(), "Khalfallah");

    }
    @Test
    void testFinById_Success(){
        List<Teacher> teacherList = teacherRepository.findAll();
        Teacher teacher = teacherService.findById(teacherList.get(0).getId());

        assertEquals(teacher.getFirstName(), "Razzak");
        assertEquals(teacher.getLastName(), "Khalfallah");
    }

}