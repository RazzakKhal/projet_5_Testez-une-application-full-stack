package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "yoga@studio.com", roles = "ADMIN")
class SessionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SessionService sessionService;

    @MockBean
    private SessionMapper sessionMapper;

    private SessionDto sessionDto;
    private Session session;

    @BeforeEach
    void setUp() {
        List<Long> users = new ArrayList();
        users.add(1L);
        users.add(2L);
        sessionDto = new SessionDto();
        sessionDto.setName("Test Session");
        sessionDto.setUsers(users);
        sessionDto.setDescription("description test");
        sessionDto.setTeacher_id(1L);
        sessionDto.setDate(new Date());

        session = new Session();
        session.setId(1L);
        session.setName("Test Session");
        session.setDescription("description test");


    }

    @Test
    public void testFindById_Success() throws Exception {
        when(sessionService.getById(1L)).thenReturn(session);
        when(sessionMapper.toDto(any(Session.class))).thenReturn(sessionDto);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/session/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Session"));
    }

    @Test
    public void testFindById_NotFound() throws Exception {
        when(sessionService.getById(1L)).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/session/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testFindAll_Success() throws Exception {
        List<Session> sessions = Collections.singletonList(session);
        when(sessionService.findAll()).thenReturn(sessions);
        when(sessionMapper.toDto(any(List.class))).thenReturn(Collections.singletonList(sessionDto));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/session"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Session"));
    }

    @Test
    public void testCreate_Success() throws Exception {
        when(sessionMapper.toEntity(any(SessionDto.class))).thenReturn(session);
        when(sessionService.create(any(Session.class))).thenReturn(session);
        when(sessionMapper.toDto(any(Session.class))).thenReturn(sessionDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/session")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sessionDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Session"));
    }

    @Test
    public void testUpdate_Success() throws Exception {
        when(sessionMapper.toEntity(any(SessionDto.class))).thenReturn(session);
        when(sessionService.update(anyLong(), any(Session.class))).thenReturn(session);
        when(sessionMapper.toDto(any(Session.class))).thenReturn(sessionDto);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/session/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sessionDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Session"));
    }

    @Test
    public void testDelete_Success() throws Exception {
        when(sessionService.getById(1L)).thenReturn(session);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/session/1"))
                .andExpect(status().isOk());

        Mockito.verify(sessionService, Mockito.times(1)).delete(1L);
    }

    @Test
    public void testParticipate_Success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/session/1/participate/2"))
                .andExpect(status().isOk());

        Mockito.verify(sessionService, Mockito.times(1)).participate(1L, 2L);
    }

    @Test
    public void testNoLongerParticipate_Success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/session/1/participate/2"))
                .andExpect(status().isOk());

        Mockito.verify(sessionService, Mockito.times(1)).noLongerParticipate(1L, 2L);
    }
}