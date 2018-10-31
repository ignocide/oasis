package ignocide.service.auth.service.user.impl;

import ignocide.service.auth.domain.User;
import ignocide.service.auth.repository.user.UserRepository;
import ignocide.service.auth.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void create(User user){
        userRepository.save(user);
    }
}
