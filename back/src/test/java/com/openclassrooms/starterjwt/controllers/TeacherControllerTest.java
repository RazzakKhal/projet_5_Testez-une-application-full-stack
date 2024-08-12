package com.openclassrooms.starterjwt.controllers;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.any;


@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "yoga@studio.com", roles = "ADMIN")
class TeacherControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    TeacherMapper teacherMapper;
    @MockBean
    TeacherService teacherService;

    private Teacher teacher;

    private TeacherDto teacherDto;
    @BeforeEach
    void setUp(){
        teacher = new Teacher();
        teacher.setFirstName("Razzak");
        teacher.setLastName("Khalfallah");

        teacherDto = new TeacherDto();
        teacherDto.setFirstName("Razzak");
        teacherDto.setLastName("Khalfallah");

        when(teacherMapper.toDto(any(Teacher.class))).thenReturn(teacherDto);

    }
    @Test
    void testFindById_Success() throws Exception {
        when(teacherService.findById(anyLong())).thenReturn(teacher);


        mockMvc.perform(MockMvcRequestBuilders.get("/api/teacher/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Razzak"))
                .andExpect(jsonPath("$.lastName").value("Khalfallah"));
    }
    @Test
    void testFindById_NotFound() throws Exception {
        when(teacherService.findById(anyLong())).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/teacher/1"))
                .andExpect(status().isNotFound());
    }
    @Test
    void testFindAll_Success() throws Exception {
        ArrayList<Teacher> teachers = new ArrayList<>();
        ArrayList<TeacherDto> teacherDtos = new ArrayList<>();
        teachers.add(teacher);
        teacherDtos.add(teacherDto);

        when(teacherService.findAll()).thenReturn(teachers);
        when(teacherMapper.toDto(any(List.class))).thenReturn(teacherDtos);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/teacher"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("Razzak"))
                .andExpect(jsonPath("$[0].lastName").value("Khalfallah"));

    }
}