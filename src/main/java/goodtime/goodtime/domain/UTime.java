package goodtime.goodtime.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int uStartTime;

    private int uEndTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


    @Override
    public String toString() {
        return "uStartTime=" + uStartTime + ", uEndTime=" + uEndTime + "}";
    }

    @Builder
    private UTime(Long id, int uStartTime, int uEndTime, User user) {
        this.id = id;
        this.uStartTime = uStartTime;
        this.user = user;
        this.uEndTime = uEndTime;
    }
}
