package goodtime.goodtime.controller;


import goodtime.goodtime.domain.UTime;
import goodtime.goodtime.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Controller
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/{roomId}/utimes")
    public ResponseEntity<Map<Integer,Integer>> getAllUTime(@PathVariable Long roomId){
        try{
             Map<Integer, Integer> uTimes = roomService.getAllUserTimes(roomId);
             return ResponseEntity.ok(uTimes);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();

        }
    }
}
