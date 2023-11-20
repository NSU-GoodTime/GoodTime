package goodtime.goodtime.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import goodtime.goodtime.domain.UTime;
import goodtime.goodtime.domain.User;
import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Getter
@Setter
@Builder
@Data
public class UTimeDto {


    private Long id;
    private int uStartTime;
    private int uEndTime;


    private List<UTimeDto> utimes;

    private Long user_id;

    @JsonCreator
    public UTimeDto(
            @JsonProperty("id") Long id,
            @JsonProperty("uStartTime") int uStartTime,
            @JsonProperty("uEndTime") int uEndTime,
            @JsonProperty("utimes") List<UTimeDto> utimes,
            @JsonProperty("user_id") Long user_id) {
        this.id = id;
        this.uStartTime = uStartTime;
        this.uEndTime = uEndTime;
        this.utimes = utimes;
        this.user_id = user_id;
    }


    public static UTimeDto form(UTime uTime){

        return UTimeDto.builder()
                .uStartTime(uTime.getUStartTime())
                .uEndTime(uTime.getUEndTime())
                .build();
    }

}
