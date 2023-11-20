package goodtime.goodtime.controller;


import goodtime.goodtime.service.RoomService;
import lombok.RequiredArgsConstructor;
import goodtime.goodtime.dto.LoginRequestDto;
import goodtime.goodtime.dto.RoomRequestDto;
import goodtime.goodtime.dto.TimeRequestDto;
import goodtime.goodtime.service.LoginService;
import goodtime.goodtime.service.RoomService;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final LoginService loginService;

    @PostMapping("/v1/room")
    public ResponseEntity<String> generateRoom(@RequestBody RoomRequestDto roomRequestDto){
        return  roomService.saveRoom(roomRequestDto);
    }

    @PostMapping("/v1/{roomId}/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequestDto, @PathVariable("roomId") Long roomId){
        return loginService.validateLogin(loginRequestDto, roomId);
    }

    @GetMapping("/v1/room/{roomId}/goodtime")
    public ResponseEntity<TimeRequestDto> findRoomTime(@PathVariable("roomId") Long roomId) {
        TimeRequestDto timeRequestDto = roomService.findTime(roomId);
        return  ResponseEntity.status(HttpStatus.OK).body(timeRequestDto);
    }

    @GetMapping("/v1/{roomId}/utimes")
    public ResponseEntity<Map<Integer,Integer>> getAllUTime(@PathVariable Long roomId){
        try{
             Map<Integer, Integer> uTimes = roomService.getAllUserTimes(roomId);
             return ResponseEntity.ok(uTimes);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/v1/{roomId}/goodTime")
    public ResponseEntity<List<Integer>> getGoodTime(@PathVariable Long roomId){
        try{
            List<Integer> goodTimes = new ArrayList<>();
            goodTimes = roomService.recommendTimes(roomId);
            return ResponseEntity.ok(goodTimes);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}