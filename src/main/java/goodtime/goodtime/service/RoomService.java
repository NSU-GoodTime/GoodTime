package goodtime.goodtime.service;

import goodtime.goodtime.domain.Room;
import goodtime.goodtime.domain.UTime;
import goodtime.goodtime.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    private static final int userWeith = 1;

    public Map<Integer,Integer> getAllUserTimes(Long id) {
        Optional<Room> roomOptional = roomRepository.findById(id);

        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();


            int startTime = room.getStartTime();
            int endTime = room.getEndTime();


            Map<Integer, Integer> timeWeightMap = new HashMap<>();

            for (int i = startTime; i <= endTime; i++) {
                timeWeightMap.put(i, 0); // 초기값은 0.0으로 설정
            }


            List<UTime> allTime = room.getUsers().stream()
                    .flatMap(user -> user.getUTimes().stream())
                    .collect(Collectors.toList());

            if (!allTime.isEmpty()) {

                for (UTime uTime : allTime) {
                        for(int i = uTime.getUStartTime(); i<uTime.getUEndTime(); i++){
                            if(timeWeightMap.containsKey(i)){
                                timeWeightMap.put(i,timeWeightMap.get(i)+1);
                            }
                        }
                }
            }
            return timeWeightMap;
        } else {
            return Collections.emptyMap();// 방이 없을 경우
        }
    }
}

