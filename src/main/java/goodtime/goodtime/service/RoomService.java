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

            // 방에 속한 모든 사용자들의 시간대를 저장한 리스트
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


    public List<Integer> recommendTimes(Long id) {
        Map<Integer, Integer> timeWeightMap = getAllUserTimes(id);

        if (!timeWeightMap.isEmpty()) {
            List<Integer> recommendedTimes = timeWeightMap.entrySet().stream()
                    .sorted((entry1, entry2) -> {
                        int weight = Integer.compare(entry2.getValue(), entry1.getValue());
                        if (weight != 0) {
                            return weight;
                        } else {
                            // 가중치가 같다면 key 값이 15에 가까운 것을 우선순위로
                            int distanceTo15Comparison = Integer.compare(Math.abs(entry1.getKey() - 15), Math.abs(entry2.getKey() - 15));
                            return distanceTo15Comparison;
                        }
                    })
                    .limit(3)
                    .map(Map.Entry::getKey)
                    .collect(Collectors.toList());

            return recommendedTimes;
        } else {
            return Collections.emptyList(); // 추천할 시간대가 없는 경우
        }
    }

}

