package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class TeacherMapperTest {
    @Autowired
    TeacherMapper teacherMapper;
    private Teacher teacher;

    private TeacherDto teacherDto;

    private List<Teacher> teacherList;
    private List<TeacherDto> teacherDtoList;
    @BeforeEach
    void setUp(){
        teacher = new Teacher(1L, "Khal", "Razzak", LocalDateTime.now(), LocalDateTime.now());
        teacherDto = new TeacherDto(1L, "Khal", "Razzak", LocalDateTime.now(), LocalDateTime.now());

        teacherList = new ArrayList<>();
        teacherList.add(teacher);

        teacherDtoList = new ArrayList<>();
        teacherDtoList.add(teacherDto);
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

    @Test
    void testToDtoList(){
        List<TeacherDto> teacherDtoList1 = teacherMapper.toDto(teacherList);

        assertEquals(teacherDtoList.size(), teacherDtoList1.size());
        assertEquals(teacherDtoList1.get(0).getFirstName(), teacherList.get(0).getFirstName());
        assertEquals(teacherDtoList1.get(0).getLastName(), teacherList.get(0).getLastName());
        assertEquals(teacherDtoList1.get(0).getId(), teacherList.get(0).getId());
        assertEquals(teacherDtoList1.get(0).getCreatedAt(), teacherList.get(0).getCreatedAt());
        assertEquals(teacherDtoList1.get(0).getUpdatedAt(), teacherList.get(0).getUpdatedAt());
    }

    @Test
    void testToEntityList(){
        List<Teacher> teacherList1 = teacherMapper.toEntity(teacherDtoList);

        assertEquals(teacherList.size(), teacherList1.size());
        assertEquals(teacherList1.get(0).getFirstName(), teacherDtoList.get(0).getFirstName());
        assertEquals(teacherList1.get(0).getLastName(), teacherDtoList.get(0).getLastName());
        assertEquals(teacherList1.get(0).getId(), teacherDtoList.get(0).getId());
        assertEquals(teacherList1.get(0).getCreatedAt(), teacherDtoList.get(0).getCreatedAt());
        assertEquals(teacherList1.get(0).getUpdatedAt(), teacherDtoList.get(0).getUpdatedAt());
    }

}