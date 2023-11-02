package goodtime.goodtime.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class LoginController {

    @PostMapping("/{roomId}/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestLogin){
        return ResponseEntity.ok("정상 로그인");
    }
}
