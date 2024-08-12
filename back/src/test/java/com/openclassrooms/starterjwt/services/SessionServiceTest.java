package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;


import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class SessionServiceTest {

    @Autowired
    SessionService sessionService;

    @Autowired
    PasswordEncoder passwordEncoder;
    @MockBean
    SessionRepository sessionRepository;
    @MockBean
    UserRepository userRepository;

    Session session;

    User user;
    @BeforeEach
    void setUp(){

        user = new User("razzaktest@example.com", "razz", "khal", passwordEncoder.encode("password123"), false);
        List<User> users = new ArrayList<>();
        users.add(user);
        session = new Session();
        session.setId(1L);
        session.setName("Test Session");
        session.setDescription("description test");
        session.setUsers(users);
    }

    @Test
    void testCreate_Success(){


        when(sessionRepository.save(any(Session.class))).thenReturn(session);
        Session createdSession = sessionService.create(session);

        assertEquals(session.getName(), createdSession.getName());
        verify(sessionRepository,  times(1)).save(session);

    }
    @Test
    void testDelete_Success(){
        doNothing().when(sessionRepository).deleteById(anyLong());
        sessionService.delete(1L);
        verify(sessionRepository, times(1)).deleteById(1L);

    }
    @Test
    void testFindAll_Success(){
        List<Session> sessions = new ArrayList<>();
        sessions.add(session);

        when(sessionRepository.findAll()).thenReturn(sessions);
        List<Session> resultat= sessionService.findAll();


        verify(sessionRepository, times(1)).findAll();
        assertEquals(sessions.size(), resultat.size());
    }
    @Test
    void testGetById_Success(){
        List<User> users = new ArrayList<>();
        users.add(user);
        session.setUsers(users);

        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));

        Session foundSession = sessionService.getById(1L);

        assertEquals("Test Session", foundSession.getName());
        verify(sessionRepository, times(1)).findById(1L);
    }
    @Test
    void testUpdate_Success(){
        List<User> users = new ArrayList<>();
        users.add(user);
        session.setUsers(users);

        when(sessionRepository.save(any(Session.class))).thenReturn(session);

        Session updatedSession = sessionService.update(1L, session);

        assertEquals("Test Session", updatedSession.getName());
        assertEquals(1L, updatedSession.getId());
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    void testParticipate_Success() {
        List<User> users = new ArrayList<>();
        session.setUsers(users);

        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(sessionRepository.save(any(Session.class))).thenReturn(session);

        sessionService.participate(1L, 1L);

        assertTrue(session.getUsers().contains(user));
        verify(sessionRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(1L);
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    void testParticipate_Failure_SessionNotFound() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.empty());
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        assertThrows(NotFoundException.class, () -> sessionService.participate(1L, 1L));

        verify(sessionRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(1L);
        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    void testParticipate_Failure_UserNotFound() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> sessionService.participate(1L, 1L));

        verify(sessionRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(1L);
        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    void testParticipate_Failure_UserAlreadyParticipating() {
       List<User> users = new ArrayList<>();
       User myUser = new User("razzaktest@example.com", "razz", "khal", passwordEncoder.encode("password123"), false);
       myUser.setId(1L);
       users.add(myUser);
       session.setUsers(users);

        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));
        when(userRepository.findById(1L)).thenReturn(Optional.of(myUser));

        assertThrows(BadRequestException.class, () -> sessionService.participate(1L, 1L));

        verify(sessionRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).findById(1L);
        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    void testNoLongerParticipate_Success() {
        List<User> users = new ArrayList<>();
        User myUser = new User("razzaktest@example.com", "razz", "khal", passwordEncoder.encode("password123"), false);
        myUser.setId(1L);
        users.add(myUser);
        session.setUsers(users);

        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));

        sessionService.noLongerParticipate(1L, 1L);

        assertFalse(session.getUsers().contains(user));
        verify(sessionRepository, times(1)).findById(1L);
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    void testNoLongerParticipate_Failure_SessionNotFound() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> sessionService.noLongerParticipate(1L, 1L));

        verify(sessionRepository, times(1)).findById(1L);
        verify(sessionRepository, never()).save(any(Session.class));
    }

    @Test
    void testNoLongerParticipate_Failure_UserNotParticipating() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));
        List<User> users= new ArrayList<>();
        session.setUsers(users);

        assertThrows(BadRequestException.class, () -> sessionService.noLongerParticipate(1L, 1L));

        verify(sessionRepository, times(1)).findById(1L);
        verify(sessionRepository, never()).save(any(Session.class));
    }
}