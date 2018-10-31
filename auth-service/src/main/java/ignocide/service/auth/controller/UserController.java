package ignocide.service.auth.controller;

import ignocide.service.auth.controller.form.UserForm;
import ignocide.service.auth.domain.User;
import ignocide.service.auth.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity createUser(@RequestBody UserForm userForm){

        User user = userForm.toUser();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.create(user);

        return ResponseEntity.ok().build();
    }
}

