package ignocide.service.auth.security;

import ignocide.service.auth.domain.User;
import ignocide.service.auth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class CustomTokenEnhancer implements TokenEnhancer {

    @Autowired
    UserRepository userRepository;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        Object principal = authentication.getPrincipal();
        Long userid = null;
        //id password로 인증 했을 경우
        if(principal instanceof CustomUserDetails){
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            userid = userDetails.getId();

        }
        //refresh token 인증 일 경우
        else if (principal instanceof String){
            String email = (String) principal;
            User user = userRepository.findByEmail(email);
            userid = user.getId();
        }


        Map<String, Object> additionalInformation = new HashMap<>();
        additionalInformation.put("id", userid);
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInformation);

        return accessToken;
    }
}
