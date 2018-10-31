package ignocide.service.auth.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ignocide.service.auth.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;

public class CustomUserDetails implements UserDetails {
    private static final long serialVersionUID = 3854749170385545665L;

    private String username;
    private String password;
    private boolean nonExpired;
    private boolean nonLocked;
    private boolean credentialNotExpired;
    private boolean enabled;

    private Set<GrantedAuthority> authorities;

    public CustomUserDetails(User user) {

        this.username = user.getEmail();
        this.password = user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.nonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.nonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialNotExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}
