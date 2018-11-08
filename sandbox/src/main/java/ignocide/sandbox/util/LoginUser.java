package ignocide.sandbox.util;

import lombok.Data;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import java.util.ArrayList;
import java.util.List;

@Data
public class LoginUser {

    @SuppressWarnings("unchecked")
    public static LoginUser getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) return null;

        return (LoginUser) ((OAuth2Authentication) authentication).getUserAuthentication().getPrincipal();
    }

    public static Long getLoginUserId() {
        LoginUser loginUser = getLoginUser();
        if (loginUser != null) {
            return loginUser.getId();
        }

        return null;
    }

    private Long id;
    private String username;
    private List<String> roles;

    public LoginUser(Long userId, String username, List<? extends GrantedAuthority> authorities) {
        this.id = userId;
        this.username = username;

        this.roles = new ArrayList<>();
        if (authorities != null && !authorities.isEmpty()) {
            for (GrantedAuthority authority : authorities) {
                this.roles.add(authority.getAuthority());
            }
        }
    }

}
