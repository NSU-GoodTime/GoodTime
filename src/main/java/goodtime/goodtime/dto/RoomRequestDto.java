package goodtime.goodtime.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RoomRequestDto {

    private String title;

    private String day;

    private int startTime;

    private int endTime;

    private int personnel;
}
