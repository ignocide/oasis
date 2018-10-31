package ignocide.service.auth.service.user;

import ignocide.service.auth.domain.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    User findByEmail(String email);
    void create(User user);
}
