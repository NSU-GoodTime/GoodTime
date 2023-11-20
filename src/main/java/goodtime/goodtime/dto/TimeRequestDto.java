package goodtime.goodtime.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TimeRequestDto {
    private int startTime;

    private int endTime;
}
