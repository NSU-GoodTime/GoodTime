package goodtime.goodtime.service;

import goodtime.goodtime.domain.Room;
import goodtime.goodtime.domain.User;
import goodtime.goodtime.dto.LoginRequestDto;
import goodtime.goodtime.repository.RoomRepository;
import goodtime.goodtime.repository.UserRepository;

import java.util.List;
import java.util.NoSuchElementException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {

    private RoomRepository roomRepository;
    private UserRepository userRepository;
    private static User user;

    private final Logger lOGGER = LoggerFactory.getLogger(RoomService.class);

    public Room findRoom(Long roomId) throws NoSuchElementException{
        Room room = new Room();
        try {
            room = roomRepository.findById(roomId).get();
        }catch (NoSuchElementException e) {
            lOGGER.info("{}번 방을 찾지 못했습니다.", roomId);
            throw new NoSuchElementException();
        }
        return room;
    }

    public ResponseEntity<String> validateLogin(LoginRequestDto loginRequestDto, Long roomId) {
        try {
            Room room = findRoom(roomId);
            int totalUser = room.getUsers().size();

            if (loginUser(loginRequestDto, room)) {
                return ResponseEntity.status(HttpStatus.OK).body(loginRequestDto.getUid());
            }

            if (totalUser < room.getPersonnel()) {
                user = registerUser(loginRequestDto);
                return ResponseEntity.status(HttpStatus.OK).body(loginRequestDto.getUid());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("신규 회원가입 불가능.");
            }
        } catch (NoSuchElementException n) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 방 번호 입니다.");
        }

    }

    public User registerUser(LoginRequestDto loginRequestDto) {
        User user = User.builder()
                .uId(loginRequestDto.getUid())
                .pw(loginRequestDto.getPw())
                .build();
        userRepository.save(user);
        lOGGER.info("{}님 회원 가입 완료", user.getUId());
        return user;
    }

    public boolean loginUser(LoginRequestDto loginRequestDto, Room room) {
        List<User> users = room.getUsers();
        for (User user : users) {
            if (user.getUId().equals(loginRequestDto.getUid()) && user.getPw().equals(loginRequestDto.getPw())) {
                return true;
            }
        }
        return false;
    }
}
