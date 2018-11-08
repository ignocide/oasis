package ignocide.service.auth.security;

import ignocide.service.auth.domain.User;
import ignocide.service.auth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Set;

@Component
public class CustomUserDetailProvider implements AuthenticationProvider {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();

        User user = userRepository.findByEmail(email);
        if (user == null) throw new UsernameNotFoundException("인증 정보가 올바르지 않습니다");

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UsernameNotFoundException("인증 정보가 올바르지 않습니다");
        }
        UserDetails userDetails = new CustomUserDetails(user);
        Collection<? extends GrantedAuthority> grantedAuthorities = userDetails.getAuthorities();
        return new UsernamePasswordAuthenticationToken(userDetails, "N/A", userDetails.getAuthorities());
    }


    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
