package goodtime.goodtime.service;

import goodtime.goodtime.controller.UTimeController;
import goodtime.goodtime.domain.UTime;
import goodtime.goodtime.domain.User;
import goodtime.goodtime.dto.UTimeDto;
import goodtime.goodtime.repository.UTimeRepository;
import goodtime.goodtime.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UTimeService {

    private final Logger LOGGER = LoggerFactory.getLogger(UTimeController.class);
    private final UTimeRepository uTimeRepository;
    private final UserRepository userRepository;

    public UTime saveUTime(UTimeDto uTimeDto, Long id) throws UserPrincipalNotFoundException {


//        Optional<User> user = userRepository.findById(id);
//        User user1 = user.orElseThrow(() -> new UserPrincipalNotFoundException("User not found with id: " + id));

        LOGGER.info("service id:{}",id);
        UTime uTime = UTime.builder()
                .uStartTime(uTimeDto.getUStartTime())
                .uEndTime(uTimeDto.getUEndTime())
//                .user(user1)
                .build();

        return uTimeRepository.save(uTime);
    }

    public List<UTime> readUTime(Long id){
        return uTimeRepository.findByUser_uId(id);
    }

}
