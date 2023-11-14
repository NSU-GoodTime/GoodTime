package goodtime.goodtime.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import goodtime.goodtime.domain.UTime;
import goodtime.goodtime.dto.UTimeDto;
import goodtime.goodtime.repository.UTimeRepository;
import goodtime.goodtime.service.UTimeService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UTimeController {
    private final Logger LOGGER = LoggerFactory.getLogger(UTimeController.class);
    private final UTimeService uTimeService;
    private final UTimeRepository uTimeRepository;

    @GetMapping("/votingStatus/{id}")
    public List<UTime> votingStatus(@PathVariable Long id) {

        List<UTime> uTimes = uTimeService.readUTime(id);
        return uTimes;
    }

    @PostMapping("/utime/{id}")
    public ResponseEntity<String> createUTimes(@RequestBody List<UTimeDto> utimes, @PathVariable Long id) throws UserPrincipalNotFoundException {


        LOGGER.info("utimes1: {}", utimes);
        LOGGER.info("id: {}", id);

        try {

            for (UTimeDto utime : utimes) {

                uTimeService.saveUTime(utime, id);
            }

            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }
}


