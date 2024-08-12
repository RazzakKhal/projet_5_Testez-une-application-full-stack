package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class TeacherMapperTest {
    @Autowired
    TeacherMapper teacherMapper;
    private Teacher teacher;

    private TeacherDto teacherDto;
    @BeforeEach
    void setUp(){
        teacher = new Teacher(1L, "Khal", "Razzak", LocalDateTime.now(), LocalDateTime.now());
        teacherDto = new TeacherDto(1L, "Khal", "Razzak", LocalDateTime.now(), LocalDateTime.now());
    }
    @Test
    void testToDto(){
        TeacherDto teacherDto1 = teacherMapper.toDto(teacher);
        assertEquals(teacherDto1.getFirstName(), teacher.getFirstName());
        assertEquals(teacherDto1.getLastName(), teacher.getLastName());
        assertEquals(teacherDto1.getId(), teacher.getId());
        assertEquals(teacherDto1.getCreatedAt(), teacher.getCreatedAt());
        assertEquals(teacherDto1.getUpdatedAt(), teacher.getUpdatedAt());
    }
    @Test
    void testToEntity(){
        Teacher teacher1 = teacherMapper.toEntity(teacherDto);
        assertEquals(teacher1.getFirstName(), teacherDto.getFirstName());
        assertEquals(teacher1.getLastName(), teacherDto.getLastName());
        assertEquals(teacher1.getId(), teacherDto.getId());
        assertEquals(teacher1.getCreatedAt(), teacherDto.getCreatedAt());
        assertEquals(teacher1.getUpdatedAt(), teacherDto.getUpdatedAt());
    }

}