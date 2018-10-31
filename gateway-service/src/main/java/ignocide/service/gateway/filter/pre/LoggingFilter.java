package ignocide.service.gateway.filter.pre;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

@Slf4j
public class LoggingFilter extends ZuulFilter {

    public String filterType() {
        return "pre";
    }

    public int filterOrder() {
        return 1;
    }

    public boolean shouldFilter() {
        return true;
    }

    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();

        String method = request.getMethod();
        String uriPathAndQuery = parseUriPathAndQuery(request);

        log.info(method+ " " + uriPathAndQuery);

        return null;
    }

    private String parseUriPathAndQuery(HttpServletRequest request) {
        String uriPath = request.getRequestURI();
        String uriQuery = request.getQueryString();
        StringBuilder sb = new StringBuilder();
        sb.append(uriPath);
        if (uriQuery != null) sb.append("?").append(uriQuery);

        return sb.toString();
    }
}
