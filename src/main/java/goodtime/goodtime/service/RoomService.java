package goodtime.goodtime.service;

import goodtime.goodtime.domain.Room;
import goodtime.goodtime.domain.UTime;
import goodtime.goodtime.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<UTime> getAllUserTimes(Long id){
        Optional<Room> roomOptional = roomRepository.findById(id);
        Room room = roomOptional.get();
        if(roomOptional.isPresent()){
            return room.getUsers().stream()
                    .flatMap(user -> user.getUTimes().stream())
                    .collect(Collectors.toList());

        }else{
            return Collections.emptyList(); // 방이 없을 경우
        }
    }
}
