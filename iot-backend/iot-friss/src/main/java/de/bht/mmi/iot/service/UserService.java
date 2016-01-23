package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.rest.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    User loadUserByUsername(String username) throws EntityNotFoundException;

    User loadUserByUsername(String username, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    Iterable<User> loadAllUsers();

    User saveUser(User user) throws EntityExistsException;

    User updateUser(User user);

    User updateUser(User user, UserDetails authenticatedUser) throws NotAuthorizedException;

    User updateUser(String username, UserPutDto user, UserDetails authenticatedUser) throws NotAuthorizedException;

    void deleteUser(String username) throws EntityNotFoundException;

    User updateUserSensors(String username, List<String> sensorList, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    boolean isRolePresent(UserDetails userDetails, String role);

    boolean isUsernameAlreadyInUse(String username);

}
