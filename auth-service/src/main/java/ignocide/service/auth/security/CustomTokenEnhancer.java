package ignocide.service.auth.security;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class CustomTokenEnhancer implements TokenEnhancer {


    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        Object principal = authentication.getPrincipal();
        //id password로 인증 했을 경우
        if(principal instanceof CustomUserDetails){
        }
        //refresh token 인증 일 경우
        else if (principal instanceof String){
        }

        List<String> roles = new LinkedList<>();
        roles.add("USER");

        Map<String, Object> additionalInformation = new HashMap<>();
        additionalInformation.put("authorities", roles);

        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInformation);

        return accessToken;
    }
}
