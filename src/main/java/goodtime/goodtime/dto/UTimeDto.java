package goodtime.goodtime.dto;

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

    @Override
    public String toString() {
        return "id=" + id +"uStartTime=" + uStartTime + ", uEndTime=" + uEndTime + "}";
    }
    private List<UTimeDto> utimes;

    private Long user_id;

    public static UTimeDto form(UTime uTime){

        return UTimeDto.builder()
                .uStartTime(uTime.getUStartTime())
                .uEndTime(uTime.getUEndTime())
                .build();
    }

}
